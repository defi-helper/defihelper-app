import {
  createStore,
  createEvent,
  createEffect,
  UnitValue,
} from 'effector-logger/macro'

import { AutostakingStakingContractsQueryVariables } from '~/api'
import { autostakingApi } from '~/autostaking/common/autostaking.api'

export const fetchContractsFx = createEffect(
  async ({
    signal,
    ...variables
  }: AutostakingStakingContractsQueryVariables & {
    signal: AbortSignal
  }) => {
    return autostakingApi.contracts(
      {
        ...variables,
        filter: {
          ...variables.filter,
          hidden: false,
          automate: {
            autorestake: true,
          },
        },
      },
      signal
    )
  }
)

export const resetContracts = createEvent()

export const $contracts = createStore<
  UnitValue<typeof fetchContractsFx.doneData>['list']
>([])
  .on(fetchContractsFx.doneData, (_, { list }) => list)
  .reset(resetContracts)
