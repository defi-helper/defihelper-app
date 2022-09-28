import { createStore, createEffect, createEvent, UnitValue } from 'effector'
import contracts from '@defihelper/networks/contracts.json'

import { loadAdapter } from '~/common/load-adapter'
import { buildAdaptersUrl } from '~/staking/common'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { Pool, tradeApi } from './common/trade.api'
import { config } from '~/config'

export const reset = createEvent()

export const networks: Record<string, string> = {
  1: 'eth',
  137: 'matic',
  56: 'bsc',
  250: 'fantom',
  42161: 'arbitrum',
  25: 'cronos',
  43114: 'avalanch',
  106: 'velas',
  ...(config.IS_DEV ? { 5: 'eth' } : {}),
}

export const fetchPairsFx = createEffect(
  async (params: { network: string; exchange: string }) => {
    const { data, message } = await tradeApi.pairs(
      [networks[params.network]],
      [params.exchange]
    )

    if (!data || message) throw new Error(message ?? 'something went wrong')

    return data.list
  }
)

export const $pairs = createStore<UnitValue<typeof fetchPairsFx.doneData>>([])
  .on(fetchPairsFx.doneData, (_, payload) => payload)
  .reset(reset)

export const fetchExchangesFx = createEffect(async (network: string) => {
  const { data, message } = await tradeApi.exchanges([networks[network]])
  const poolInfo = await tradeApi.poolInfo([networks[network]])

  if (!data || message || !poolInfo.code || poolInfo.message)
    throw new Error(poolInfo.message ?? message ?? 'something went wrong')

  const poolInfoMap = poolInfo.data.reduce<Record<string, Pool>>(
    (acc, item) => {
      acc[item.Name.toLowerCase()] = item
      acc[item.DexName.toLowerCase()] = item

      return acc
    },
    {}
  )

  return data.map((item) => {
    return {
      ...item,
      Address:
        item.Address ??
        poolInfoMap[item.Name.toLowerCase()]?.Routers?.[0]?.Address,
    }
  })
})

export const $exchanges = createStore<
  UnitValue<typeof fetchExchangesFx.doneData>
>([])
  .on(fetchExchangesFx.doneData, (_, payload) => payload)
  .reset(reset)

export const fetchHistoryFx = createEffect((params: { address: string }) =>
  tradeApi.history(params.address, '1660012666', '1661164666', 320, '60')
)

export const $history = createStore<UnitValue<
  typeof fetchHistoryFx.doneData
> | null>(null)
  .on(fetchHistoryFx.doneData, (_, payload) => payload)
  .reset(reset)

export const fetchAdapterFx = createEffect(
  async (params: { provider: unknown; chainId: string }) => {
    const networkProvider = walletNetworkModel.getNetwork(
      params.provider,
      params.chainId
    )

    const contract = contracts[params.chainId as keyof typeof contracts]

    if (!('SmartTradeRouter' in contract)) throw new Error('wrong chain id')
    if (!('SmartTradeSwapHandler' in contract))
      throw new Error('wrong chain id')

    if (!networkProvider) throw new Error('provider is not defined')

    const { automates } = await loadAdapter(buildAdaptersUrl('dfh'))

    const { smartTrade } = automates

    return {
      router: (
        await smartTrade.router(
          networkProvider.getSigner(),
          contract.SmartTradeRouter.address
        )
      ).methods,
      swap: (
        await smartTrade.swapHandler(
          networkProvider.getSigner(),
          contract.SmartTradeSwapHandler.address
        )
      ).methods,
    }
  }
)

export const $adapter = createStore<UnitValue<
  typeof fetchAdapterFx.doneData
> | null>(null)
  .on(fetchAdapterFx.doneData, (_, payload) => payload)
  .reset(reset)
