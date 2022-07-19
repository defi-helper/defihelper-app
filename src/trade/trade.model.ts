import { createStore, createEffect, createEvent, UnitValue } from 'effector'

import { tradeApi } from './common/trade.api'

export const reset = createEvent()

export const fetchPairsFx = createEffect(async () => {
  const { data, message } = await tradeApi.pairs()

  if (!data || message) throw new Error(message ?? 'something went wrong')

  return data.list
})

export const $pairs = createStore<UnitValue<typeof fetchPairsFx.doneData>>([])
  .on(fetchPairsFx.doneData, (_, payload) => payload)
  .reset(reset)

export const fetchExchangesFx = createEffect(async () => {
  const { data, message } = await tradeApi.exchanges()

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
