import {
  createStore,
  createEffect,
  createEvent,
  UnitValue,
  sample,
  combine,
} from 'effector'

import { tradeApi } from '~/trade/common/trade.api'
import {
  TradeOrderListQueryVariables,
  TradeUpdateOrderMutationVariables,
} from '~/api'
import { hasBoughtPrice } from '~/trade/common/trade.types'
import * as tradeSmartSellModel from '~/trade/trade-smart-sell/trade-smart-sell.model'

export const reset = createEvent()

export const fetchOrdersFx = createEffect(
  async (variables: TradeOrderListQueryVariables) => {
    const data = await tradeApi.fetchOrders(variables)

    return data
  }
)

export const cancelOrderFx = createEffect(async ({ id }: { id: string }) => {
  const data = await tradeApi.cancelOrder(id)

  if (!data) throw new Error('something went wrong')

  return data
})

export const claimOrderFx = createEffect(async ({ id }: { id: string }) => {
  const data = await tradeApi.claimOrder(id)

  if (!data) throw new Error('something went wrong')

  return data
})

export const updateOrderFx = createEffect(
  async (variables: TradeUpdateOrderMutationVariables) => {
    const data = await tradeApi.updateOrder(variables)

    if (!data) throw new Error('something went wrong')

    return data
  }
)

export type Orders = UnitValue<typeof fetchOrdersFx.doneData>

export const $orders = createStore<Orders | null>(null)
  .on(fetchOrdersFx.doneData, (_, payload) => payload)
  .on(tradeSmartSellModel.createOrderFx.doneData, (state, payload) => ({
    list: [payload, ...(state?.list ?? [])],
    pagination: state?.pagination ?? 0,
  }))
  .on([cancelOrderFx.doneData, updateOrderFx.doneData], (state, payload) => ({
    list:
      state?.list.map((order) => (order.id === payload.id ? payload : order)) ??
      [],
    pagination: state?.pagination ?? 0,
  }))
  .on(claimOrderFx.doneData, (state, payload) => ({
    list: state?.list.filter((order) => order.id !== payload.id) ?? [],
    pagination: state?.pagination ?? 0,
  }))
  .reset(reset)

export const fetchActualPricesFx = createEffect(
  async (params: { id: string; path: string[] }[]) => {
    const pricesArr = params.map(async ({ id, path }) => {
      const actualPrice = await tradeApi.price(path)

      return {
        id,
        path,
        actualPrice,
      }
    })

    const prices = await Promise.all(pricesArr)

    return prices.reduce<Record<string, typeof prices[number]>>(
      (acc, price) => {
        acc[price.id] = price

        return acc
      },
      {}
    )
  }
)

export const $prices = createStore<
  UnitValue<typeof fetchActualPricesFx.doneData>
>({})
  .on(fetchActualPricesFx.doneData, (_, payload) => payload)
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

sample({
  clock: $orders.updates,
  fn: (orders) =>
    (orders?.list ?? [])
      .map((order) => ({
        id: order.id,
        path: hasBoughtPrice(order.callData) ? order.callData.path : null,
      }))
      .filter((order): order is { id: string; path: string[] } =>
        Boolean(order.path)
      ),
  target: fetchActualPricesFx,
})

export const $ordersWithPrice = combine($orders, $prices, (orders, prices) => {
  return {
    list:
      orders?.list.map(({ id, ...order }) => ({
        ...order,
        id,
        price: prices[id] ?? null,
      })) ?? [],
    pagination: orders?.pagination,
  }
})
