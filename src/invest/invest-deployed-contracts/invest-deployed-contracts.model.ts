import { createEffect } from 'effector'

import { InvestStopLossEnableMutationVariables } from '~/api'
import { investApi } from '~/invest/common/invest.api'

export const enableStopLossFx = createEffect(
  (params: InvestStopLossEnableMutationVariables['input']) => {
    return investApi.enableStopLoss({ input: params })
  }
)
