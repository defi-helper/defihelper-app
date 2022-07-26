import { createDomain, sample } from 'effector'
import { createGate } from 'effector-react'
import networks from '@defihelper/networks/contracts.json'

import { AutomationProductsQuery } from '~/api/_generated-types'
import { automationApi } from '../common/automation.api'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { toastsService } from '~/toasts'
import { authModel } from '~/auth'
import { loadAdapter } from '~/common/load-adapter'
import { buildAdaptersUrl } from '~/staking/common'

type Product = Exclude<
  AutomationProductsQuery['products']['list'],
  null | undefined
>[number] & { buying?: boolean }

type BuyProductParams = {
  provider: unknown
  chainId: string
  account: string
  product: Product
}

const contracts = networks['43114'].StoreUpgradable // networks[config.DEFAULT_CHAIN_ID].StoreUpgradable

export const automationProductsDomain = createDomain()

export const fetchProductsFx = automationProductsDomain.createEffect(() =>
  automationApi.getProducts()
)

export const buyProductFx = automationProductsDomain.createEffect(
  async (params: BuyProductParams) => {
    const adapterObj = await loadAdapter(buildAdaptersUrl('dfh'))

    const networkProvider = walletNetworkModel.getNetwork(
      params.provider,
      params.chainId
    )

    if (!networkProvider) {
      throw new Error('networkprovider is null')
    }

    const result = await adapterObj.store(
      networkProvider.getSigner(),
      contracts.address
    )

    const can = await result.canBuy(params.product.number)

    if (can instanceof Error) throw can

    const { tx } = await result.buy(params.product.number)

    await tx.wait()
  }
)

export const AutomationProductsGate = createGate({
  name: 'AutomationProductsGate',
  domain: automationProductsDomain,
})

export const $products = automationProductsDomain
  .createStore<Product[]>([])
  .on(fetchProductsFx.doneData, (_, { list }) => list)
  .on(buyProductFx, (state, payload) =>
    state.map((product) =>
      product.id === payload.product.id ? { ...product, buying: true } : product
    )
  )
  .on(buyProductFx.finally, (state, { params }) =>
    state.map((product) =>
      product.id === params.product.id ? { ...product, buying: false } : product
    )
  )
  .reset(AutomationProductsGate.close, authModel.logoutFx)

sample({
  clock: AutomationProductsGate.open,
  target: fetchProductsFx,
})

toastsService.forwardErrors(fetchProductsFx.failData, buyProductFx.failData)
