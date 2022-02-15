import { createDomain, sample } from 'effector-logger/macro'
import { createGate } from 'effector-react'
import networks from '@defihelper/networks/contracts.json'
import { ethers } from 'ethers'

import { abi } from '~/abi'
import { parseError } from '~/common/parse-error'
import { AutomationProductsQuery } from '~/graphql/_generated-types'
import { automationApi } from '../common/automation.api'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { bignumberUtils } from '~/common/bignumber-utils'
import { dateUtils } from '~/common/date-utils'
import { toastsService } from '~/toasts'
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

const contracts = networks[config.DEFAULT_CHAIN_ID].Store

export const automationProductsDomain = createDomain()

export const fetchProductsFx = automationProductsDomain.createEffect(
  automationApi.getProducts
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

    try {
      const gasLimit = bignumberUtils.estimateGas(
        await contract.estimateGas.buy(
          params.product.number,
          params.account,
          bignumberUtils.toSend(params.product.priceUSD, 6),
          dateUtils.addTimestamp(3, 'second')
        )
      )

      const transactionReceipt = await contract.buy(
        params.product.number,
        params.account,
        bignumberUtils.toSend(params.product.priceUSD, 6),
        dateUtils.addTimestamp(3, 'second'),
        {
          gasLimit,
        }
      )

      await transactionReceipt.wait()
    } catch (error) {
      throw parseError(error)
    }
  }
)

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

export const AutomationProductsGate = createGate({
  name: 'AutomationProductsGate',
  domain: automationProductsDomain,
})

sample({
  clock: AutomationProductsGate.open,
  target: fetchProductsFx,
})

toastsService.forwardErrors(fetchProductsFx.failData, buyProductFx.failData)
