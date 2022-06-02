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
        pagination: {
          limit: 100,
        },
        filter: {
          ...variables.filter,
          hidden: false,
          automate: {
            autorestakeCandidate: true,
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
  .on(fetchContractsFx.doneData, (state, { list }) => [...state, ...list])
  .reset(resetContracts)
