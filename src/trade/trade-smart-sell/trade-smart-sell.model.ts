import { createEffect } from 'effector'
import { SmartTradeSwapOrderCreateInputType } from '~/api'

import { tradeApi } from '../common/trade.api'

export const createOrderFx = createEffect(
  async (variables: SmartTradeSwapOrderCreateInputType) => {
    const result = await tradeApi.createOrder(variables)

    if (!result) throw new Error('something went wrong')

    return result
  }
)
