import {
  createStore,
  createEvent,
  createEffect,
  UnitValue,
  combine,
} from 'effector-logger/macro'

import {
  AutostakingStakingContractsQueryVariables,
  ContractUserLinkTypeEnum,
} from '~/api'
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

type Contract = UnitValue<typeof fetchContractsFx.doneData>['list'][number]

export const contractUserLinkFx = createEffect(
  (params: { contract: Contract; userId: string }) => {
    return autostakingApi.contractUserLink({
      contract: params.contract.id,
      user: params.userId,
    })
  }
)

export const contractUserUnlinkFx = createEffect(
  (params: { contract: Contract; userId: string }) => {
    return autostakingApi.contractUserUnlink({
      contract: params.contract.id,
      user: params.userId,
    })
  }
)

export const resetContracts = createEvent()

export const $contracts = createStore<
  UnitValue<typeof fetchContractsFx.doneData>['list']
>([])
  .on(fetchContractsFx.doneData, (state, { list }) => [...state, ...list])
  .on(contractUserUnlinkFx.done, (state, { params }) =>
    state.filter((contract) => contract.id !== params.contract.id)
  )
  .on(contractUserLinkFx.done, (state, { params }) => [
    ...state,
    params.contract,
  ])
  .reset(resetContracts)

export const fetchHiddenContractsFx = createEffect(
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
          userLink: ContractUserLinkTypeEnum.AutorestakeHide,
        },
      },
      signal
    )
  }
)

export const resetHiddenContracts = createEvent()

export const $hiddenContracts = createStore<
  UnitValue<typeof fetchHiddenContractsFx.doneData>['list']
>([])
  .on(fetchHiddenContractsFx.doneData, (state, { list }) => [...state, ...list])
  .on(contractUserLinkFx.done, (state, { params }) =>
    state.filter((contract) => contract.id !== params.contract.id)
  )
  .on(contractUserUnlinkFx.done, (state, { params }) => [
    ...state,
    params.contract,
  ])
  .reset(resetHiddenContracts)

export const $linkLoading = createStore<Record<string, boolean>>({})
  .on(contractUserLinkFx, (state, payload) => ({
    ...state,
    [payload.contract.id]: true,
  }))
  .on(contractUserLinkFx.finally, (state, { params }) => ({
    ...state,
    [params.contract.id]: false,
  }))
  .reset(resetHiddenContracts)

export const $unlinkLoading = createStore<Record<string, boolean>>({})
  .on(contractUserUnlinkFx, (state, payload) => ({
    ...state,
    [payload.contract.id]: true,
  }))
  .on(contractUserUnlinkFx.finally, (state, { params }) => ({
    ...state,
    [params.contract.id]: false,
  }))
  .reset(resetHiddenContracts)

export const $contractsWithLoading = combine(
  $contracts,
  $unlinkLoading,
  (contracts, unlinkLoading) =>
    contracts.map((contract) => ({
      ...contract,
      hidding: unlinkLoading[contract.id],
    }))
)

export const $hiddenContractsWithLoading = combine(
  $hiddenContracts,
  $linkLoading,
  (hiddenContracts, linkLoading) =>
    hiddenContracts.map((contract) => ({
      ...contract,
      showing: linkLoading[contract.id],
    }))
)
