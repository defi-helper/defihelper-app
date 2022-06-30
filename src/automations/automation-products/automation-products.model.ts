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
import { config } from '~/config'
import { authModel } from '~/auth'

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

const contracts = networks[config.DEFAULT_CHAIN_ID].Store

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
      abi.Store.abi,
      networkProvider.getSigner()
    )

    const price = await automationApi.productPriceFeed({
      network: params.chainId,
      id: params.product.id,
    })

    if (!price) throw new Error('wrong price')

    const tenPercent = bignumberUtils.mul(bignumberUtils.div(price, 100), 10)

    const priceWithPercetage = bignumberUtils.plus(tenPercent, price)

    const priceNormalized = bignumberUtils.toSend(priceWithPercetage, 18)

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
