import { createStore, createEffect, createEvent, UnitValue } from 'effector'

import { tradeApi } from './common/trade.api'

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

  if (!data || message) throw new Error(message ?? 'something went wrong')

  return data
})

export const $exchanges = createStore<
  UnitValue<typeof fetchExchangesFx.doneData>
>([])
  .on(fetchExchangesFx.doneData, (_, payload) => payload)
  .reset(reset)

export const fetchHistoryFx = createEffect(tradeApi.history)

export const $history = createStore<UnitValue<
  typeof fetchHistoryFx.doneData
> | null>(null)
  .on(fetchHistoryFx.doneData, (_, payload) => payload)
  .reset(reset)
