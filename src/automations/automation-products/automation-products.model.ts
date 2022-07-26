import { createDomain, sample } from 'effector'
import { createGate } from 'effector-react'
import networks from '@defihelper/networks/contracts.json'
import { ethers } from 'ethers'

import { abi } from '~/abi'
import { parseError } from '~/common/parse-error'
import { AutomationProductsQuery } from '~/api/_generated-types'
import { automationApi } from '../common/automation.api'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { bignumberUtils } from '~/common/bignumber-utils'
import { dateUtils } from '~/common/date-utils'
import { toastsService } from '~/toasts'
// import { config } from '~/config'
import { authModel } from '~/auth'
import { config } from '~/config'

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
    const networkProvider = walletNetworkModel.getNetwork(
      params.provider,
      params.chainId
    )

    if (!networkProvider) {
      throw new Error('networkprovider is null')
    }

    const contract = new ethers.Contract(
      contracts.address,
      abi.StoreUpgradable.abi,
      networkProvider.getSigner()
    )

    const price = (await contract.price(params.product.number)).toString()

    const priceNormalized = bignumberUtils.floor(
      bignumberUtils.mul(price, 1.05)
    )

    if (config.IS_DEV) {
      // eslint-disable-next-line no-console
      console.log(
        params.product.number,
        params.account,
        priceNormalized,
        dateUtils.addTimestamp(3, 'second'),
        {
          value: priceNormalized,
        }
      )
    }

    try {
      const gasLimit = bignumberUtils.estimateGas(
        await contract.estimateGas.buy(
          params.product.number,
          params.account,
          priceNormalized,
          dateUtils.addTimestamp(3, 'second'),
          {
            value: priceNormalized,
          }
        )
      )

      const transactionReceipt = await contract.buy(
        params.product.number,
        params.account,
        priceNormalized,
        dateUtils.addTimestamp(3, 'second'),
        {
          gasLimit,
          value: priceNormalized,
        }
      )

      await transactionReceipt.wait()
    } catch (error) {
      throw parseError(error)
    }
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
