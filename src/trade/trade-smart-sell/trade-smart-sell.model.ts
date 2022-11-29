import { createEffect, createEvent, createStore } from 'effector'

import { SmartTradeSwapOrderCreateInputType } from '~/api'
import { tradeApi } from '../common/trade.api'

export const createOrderFx = createEffect(
  async (variables: SmartTradeSwapOrderCreateInputType) => {
    const result = await tradeApi.createOrder(variables)

    if (!result) throw new Error('something went wrong')

    return result
  }
)

export const changeDeadline = createEvent<string>()

export const reset = createEvent()

export const $deadline = createStore('30')
  .on(changeDeadline, (_, payload) => payload)
  .reset(reset)
