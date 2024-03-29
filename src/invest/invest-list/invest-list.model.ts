import {
  createStore,
  createEvent,
  createEffect,
  UnitValue,
  combine,
} from 'effector'

import {
  AutostakingStakingContractsQueryVariables,
  ContractUserLinkTypeEnum,
} from '~/api'
import { investApi } from '~/invest/common/invest.api'
import { bignumberUtils } from '~/common/bignumber-utils'
import { automationApi } from '~/automations/common/automation.api'

export const fetchContractsFx = createEffect(
  async ({
    signal,
    ...variables
  }: AutostakingStakingContractsQueryVariables & {
    signal: AbortSignal
  }) => {
    return investApi.contracts(
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
            autorestake: true,
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
    return investApi.contractUserLink({
      contract: params.contract.id,
      user: params.userId,
    })
  }
)

export const contractUserUnlinkFx = createEffect(
  (params: { contract: Contract; userId: string }) => {
    return investApi.contractUserUnlink({
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
    return investApi.contracts(
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
    contracts
      .map((contract) => ({
        ...contract,
        hidding: unlinkLoading[contract.id],
      }))
      .filter((contract) =>
        bignumberUtils.gt(
          bignumberUtils.mul(
            bignumberUtils.minus(
              contract.metric.myAPYBoost,
              contract.metric.aprYear
            ),
            100
          ),
          1
        )
      )
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

export const fetchContractAddressesFx = createEffect(
  async (params: {
    contracts: UnitValue<typeof fetchContractsFx.doneData>['list']
    protocolAdapter?: string
  }) => {
    const contracts = params.contracts.map(({ id, network, automate }) => ({
      id,
      network,
      autorestake: automate.autorestake,
    }))

    return automationApi.getContractsAddresses(
      contracts,
      params.protocolAdapter
    )
  }
)
