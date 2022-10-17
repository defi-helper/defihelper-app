import { createEffect, createEvent, createStore, UnitValue } from 'effector'

import { stakingApi } from '~/staking/common'

export const restakeCalculatorFx = createEffect(stakingApi.restakeCalculator)

export const reset = createEvent()

export const $restakeCalculator = createStore<UnitValue<
  typeof restakeCalculatorFx.doneData
> | null>(null)
  .on(restakeCalculatorFx.doneData, (_, payload) => payload)
  .reset(reset)
