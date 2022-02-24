import { createDomain, guard, restore, sample } from 'effector-logger/macro'
import { createGate } from 'effector-react'

import {
  ContractListSortInputTypeColumnEnum,
  SortOrderEnum,
} from '~/graphql/_generated-types'
import { Contract, stakingApi, StakingListPayload } from '~/staking/common'
import { PaginationState } from '~/common/create-pagination'
import { toastsService } from '~/toasts'
import * as stakingAutomatesModel from '~/staking/staking-automates/staking-automates.model'
import * as stakingUpdateModel from '~/staking/staking-update/staking-update.model'
import { createUseInfiniteScroll } from '~/common/create-use-infinite-scroll'

export const stakingListDomain = createDomain()

const NOT_DELETED = 'Not deleted'

type Params = StakingListPayload & PaginationState

export const stakingUpdateFx = stakingListDomain.createEffect(
  stakingUpdateModel.contractUpdate
)

export const fetchStakingListFx = stakingListDomain.createEffect(
  async (params: Params) => {
    const data = await stakingApi.contractList({
      filter: {
        id: params.protocolId,
      },
      contractFilter: {
        hidden: params.hidden,
        ...(params.search ? { search: params.search } : {}),
      },
      contractPagination: {
        offset: params.offset,
        limit: params.limit,
      },
      contractSort: [
        {
          column:
            params.sortColumn ?? ContractListSortInputTypeColumnEnum.MyStaked,
          order: params.sortOrder ?? SortOrderEnum.Desc,
        },
        {
          column: ContractListSortInputTypeColumnEnum.AprYear,
          order: SortOrderEnum.Desc,
        },
        {
          column: ContractListSortInputTypeColumnEnum.Name,
          order: SortOrderEnum.Asc,
        },
      ],
    })

    return data
  }
)

export const deleteStakingFx = stakingListDomain.createEffect(
  async (id: string) => {
    const isDeleted = await stakingApi.contractDelete(id)

    if (isDeleted) {
      return id
    }

    throw new Error(NOT_DELETED)
  }
)

export const $contractList = stakingListDomain
  .createStore<Contract[]>([])
  .on(fetchStakingListFx.doneData, (state, payload) =>
    state.concat(
      payload.contracts.map((contract) => ({
        ...contract,
        type: 'Contract',
      }))
    )
  )
  .on(deleteStakingFx.doneData, (state, payload) => {
    return state.filter(({ id }) => id !== payload)
  })

export const $contractsListCopies = restore($contractList.updates, []).on(
  stakingUpdateFx.doneData,
  (state, payload) => {
    return state.map((contract) =>
      contract.id === payload?.id
        ? { ...contract, hidden: payload.hidden }
        : contract
    )
  }
)

export const StakingListGate = createGate<StakingListPayload>({
  name: 'StakingListGate',
  domain: stakingListDomain,
})

export const useInfiniteScroll = createUseInfiniteScroll({
  domain: stakingListDomain,
  limit: 20,
  items: $contractsListCopies,
  loading: fetchStakingListFx.pending,
})
$contractList.reset(useInfiniteScroll.reset)

sample({
  clock: StakingListGate.state.updates,
  target: useInfiniteScroll.reset,
})

guard({
  clock: sample({
    source: [
      useInfiniteScroll.state,
      StakingListGate.state,
      StakingListGate.status,
    ],
    clock: [
      StakingListGate.state.updates,
      useInfiniteScroll.updates,
      stakingAutomatesModel.updated,
    ],
    fn: ([pagination, gate, opened]) => ({
      ...pagination,
      ...gate,
      opened,
    }),
  }),
  filter: ({ protocolId, opened }) => Boolean(protocolId) && opened,
  target: fetchStakingListFx,
})

sample({
  clock: fetchStakingListFx.doneData,
  fn: (clock) => clock.pagination,
  target: useInfiniteScroll.totalElements,
})

toastsService.forwardErrors(
  fetchStakingListFx.failData,
  deleteStakingFx.failData
)

$contractList.reset(StakingListGate.close)
