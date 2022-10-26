import { createStore, createEffect, createEvent, UnitValue } from 'effector'

import { tradeApi } from '~/trade/common/trade.api'
import {
  TradeOrderListQueryVariables,
  TradeUpdateOrderMutationVariables,
} from '~/api'
import * as tradeSmartSellModel from '~/trade/trade-smart-sell/trade-smart-sell.model'
import { SmartTradeSwapHandler } from '~/common/load-adapter'
import { hasBoughtPrice } from '~/trade/common/trade.types'

export const reset = createEvent()

export const fetchOrdersFx = createEffect(
  async ({
    swap,
    ...variables
  }: TradeOrderListQueryVariables & {
    swap: SmartTradeSwapHandler['methods']
  }) => {
    const { list, pagination } = await tradeApi.fetchOrders(variables)

    return {
      list: await Promise.all(
        list.map(async ({ callData, ...order }) => ({
          ...order,
          callData: {
            ...callData,
            currentPrice: hasBoughtPrice(callData)
              ? await swap.amountOut(callData.exchange, callData.path, '1')
              : null,
          },
        }))
      ),
      pagination,
    }
  }
)

export const cancelOrderFx = createEffect(
  async ({
    id,
    swap,
  }: {
    id: string
    swap: SmartTradeSwapHandler['methods']
  }) => {
    const data = await tradeApi.cancelOrder(id)

    if (!data) throw new Error('something went wrong')

    return {
      ...data,
      callData: {
        ...data.callData,
        currentPrice: hasBoughtPrice(data.callData)
          ? await swap.amountOut(
              data.callData.exchange,
              data.callData.path,
              '1'
            )
          : null,
      },
    }
  }
)

export const updateOrderFx = createEffect(
  async ({
    swap,
    ...variables
  }: TradeUpdateOrderMutationVariables & {
    swap: SmartTradeSwapHandler['methods']
  }) => {
    const data = await tradeApi.updateOrder(variables)

    if (!data) throw new Error('something went wrong')

    return {
      ...data,
      callData: {
        ...data.callData,
        currentPrice: hasBoughtPrice(data.callData)
          ? await swap.amountOut(
              data.callData.exchange,
              data.callData.path,
              '1'
            )
          : null,
      },
    }
  }
)

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
  .on(updateOrderFx.doneData, (state, payload) => ({
    list:
      state?.list.map((order) => (order.id === payload.id ? payload : order)) ??
      [],
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

export const editStarted = createEvent<string>()

export const editEnded = createEvent()

export const $editingOrder = createStore<string>('')
  .on(editStarted, (_, payload) => payload)
  .reset(editEnded)
