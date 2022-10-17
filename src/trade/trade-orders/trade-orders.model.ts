import { createStore, createEffect, createEvent, UnitValue } from 'effector'

import { tradeApi } from '../common/trade.api'
import * as tradeSmartSellModel from '~/trade/trade-smart-sell/trade-smart-sell.model'

export const reset = createEvent()

export const fetchOrdersFx = createEffect(tradeApi.fetchOrders)

export const cancelOrderFx = createEffect(async (id: string) => {
  const data = await tradeApi.cancelOrder(id)

  if (!data) throw new Error('something went wrong')

  return data
})

export type Orders = UnitValue<typeof fetchOrdersFx.doneData>

export const $orders = createStore<Orders | null>(null)
  .on(fetchOrdersFx.doneData, (_, payload) => payload)
  .on(tradeSmartSellModel.createOrderFx.doneData, (state, payload) => ({
    list: [payload, ...(state?.list ?? [])],
    pagination: state?.pagination ?? 0,
  }))
  .on(cancelOrderFx.doneData, (state, payload) => ({
    list:
      state?.list.map((order) =>
        order.number === payload.id ? payload : order
      ) ?? [],
    pagination: state?.pagination ?? 0,
  }))
  .reset(reset)

export const claimStarted = createEvent<string>()

export const claimEnded = createEvent()

export const $claimingOrder = createStore<string>('')
  .on(claimStarted, (_, payload) => payload)
  .reset(claimEnded)

export const depositStarted = createEvent<string>()

export const depositEnded = createEvent()

export const $depositingOrder = createStore<string>('')
  .on(depositStarted, (_, payload) => payload)
  .reset(depositEnded)
