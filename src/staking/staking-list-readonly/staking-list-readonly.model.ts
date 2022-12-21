import { createDomain, guard, restore, sample } from 'effector'
import { createGate } from 'effector-react'

import {
  ContractListSortInputTypeColumnEnum,
  SortOrderEnum,
} from '~/api/_generated-types'
import {
  ContractDebank,
  stakingApi,
  StakingListPayload,
} from '~/staking/common'
import { PaginationState } from '~/common/create-pagination'
import { toastsService } from '~/toasts'
import * as stakingAutomatesModel from '~/invest/invest-deployed-contracts/invest-deployed-contracts.model'
import * as stakingUpdateModel from '~/staking/staking-update/staking-update.model'
import { createUseInfiniteScroll } from '~/common/create-use-infinite-scroll'

export const stakingListDomain = createDomain()

const NOT_DELETED = 'Not deleted'

type Params = StakingListPayload & PaginationState

export const stakingUpdateFx = stakingListDomain.createEffect(
  stakingUpdateModel.contractUpdate
)

export const fetchDebankStakingListFx = stakingListDomain.createEffect(
  async (params: Params) => {
    const data = await stakingApi.contractDebankList({
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

export const $contractDebankList = stakingListDomain
  .createStore<ContractDebank[]>([])
  .on(fetchDebankStakingListFx.doneData, (state, payload) =>
    state.concat(
      payload.contracts.map((contract) => ({
        ...contract,
        type: 'ContractDebank',
      }))
    )
  )

export const $contractsListCopies = restore($contractDebankList.updates, []).on(
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
  loading: fetchDebankStakingListFx.pending,
})
$contractDebankList.reset(useInfiniteScroll.reset)

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
      StakingListGate.status.updates,
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
  target: fetchDebankStakingListFx,
})

sample({
  clock: fetchDebankStakingListFx.doneData,
  fn: (clock) => clock.pagination,
  target: useInfiniteScroll.totalElements,
})

toastsService.forwardErrors(
  fetchDebankStakingListFx.failData,
  deleteStakingFx.failData
)

$contractDebankList.reset(StakingListGate.close)
