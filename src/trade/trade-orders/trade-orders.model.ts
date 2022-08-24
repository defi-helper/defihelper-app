import { createStore, createEffect, createEvent, UnitValue } from 'effector'

import { tradeApi } from '../common/trade.api'
import * as tradeSmartSellModel from '~/trade/trade-smart-sell/trade-smart-sell.model'
import { SmartTradeOrderStatusEnum } from '~/api'

export const reset = createEvent()

export const fetchOrdersFx = createEffect(tradeApi.fetchOrders)

export const cancelOrder = createEvent<string>()

export type Orders = UnitValue<typeof fetchOrdersFx.doneData>

export const $orders = createStore<Orders | null>(null)
  .on(fetchOrdersFx.doneData, (_, payload) => payload)
  .on(tradeSmartSellModel.createOrderFx.doneData, (state, payload) => ({
    list: [payload, ...(state?.list ?? [])],
    pagination: state?.pagination ?? 0,
  }))
  .on(cancelOrder, (state, payload) => ({
    list:
      state?.list.map((order) =>
        order.number === payload
          ? { ...order, status: SmartTradeOrderStatusEnum.Canceled }
          : order
      ) ?? [],
    pagination: state?.pagination ?? 0,
  }))
  .reset(reset)
