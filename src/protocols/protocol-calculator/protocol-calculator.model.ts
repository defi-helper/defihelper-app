import {
  createEffect,
  createStore,
  UnitValue,
  createEvent,
} from 'effector-logger/macro'

import { ContractListSortInputTypeColumnEnum, SortOrderEnum } from '~/api'
import { stakingApi } from '~/staking/common'
import { protocolsApi } from '../common'

export const fetchContractsFx = createEffect(async (protocolId: string) => {
  const data = await stakingApi.contractList({
    filter: {
      id: protocolId,
    },
    contractFilter: {
      hidden: false,
    },
    contractPagination: {
      offset: 0,
      limit: 1,
    },
    contractSort: [
      {
        column: ContractListSortInputTypeColumnEnum.AprYear,
        order: SortOrderEnum.Desc,
      },
    ],
  })

  return data.contracts
})

export const reset = createEvent()

export const $contracts = createStore<
  UnitValue<typeof fetchContractsFx.doneData>
>([])
  .on(fetchContractsFx.doneData, (_, payload) => payload)
  .reset(reset)

export const fetchEstimateFx = createEffect(protocolsApi.earnings)

export const $metrics = createStore<UnitValue<
  typeof fetchEstimateFx.doneData
> | null>(null)
  .on(fetchEstimateFx.doneData, (_, payload) => payload)
  .reset(reset)
