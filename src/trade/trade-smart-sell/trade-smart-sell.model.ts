import { createEffect } from 'effector'

import { SmartTradeSwapOrderCreateInputType } from '~/api'
import { SmartTradeSwapHandler } from '~/common/load-adapter'
import { tradeApi } from '../common/trade.api'
import { hasBoughtPrice } from '../common/trade.types'

export const createOrderFx = createEffect(
  async ({
    swap,
    ...variables
  }: SmartTradeSwapOrderCreateInputType & {
    swap: SmartTradeSwapHandler['methods']
  }) => {
    const result = await tradeApi.createOrder(variables)

    if (!result) throw new Error('something went wrong')

    return {
      ...result,
      callData: {
        ...result.callData,
        currentPrice: hasBoughtPrice(result.callData)
          ? await swap.amountOut(
              result.callData.exchange,
              result.callData.path,
              '1'
            )
          : null,
      },
    }
  }
)
