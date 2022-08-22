import { createStore, createEffect, createEvent, UnitValue } from 'effector'

import { tradeApi } from '../common/trade.api'
import * as tradeSmartSellModel from '~/trade/trade-smart-sell/trade-smart-sell.model'

export const reset = createEvent()

export const fetchOrdersFx = createEffect(tradeApi.fetchOrders)

export const $orders = createStore<UnitValue<
  typeof fetchOrdersFx.doneData
> | null>(null)
  .on(fetchOrdersFx.doneData, (_, payload) => payload)
  .on(tradeSmartSellModel.createOrderFx.doneData, (state, payload) => ({
    list: [payload, ...(state?.list ?? [])],
    pagination: state?.pagination ?? 0,
  }))
  .reset(reset)
