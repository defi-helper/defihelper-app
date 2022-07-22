import {
  createStore,
  createEvent,
  createEffect,
  UnitValue,
  createDomain,
  sample,
  combine,
} from 'effector'

import {
  AutostakingStakingContractsQueryVariables,
  BuyLiquidityProtocolsSelectQueryVariables,
  ContractListSortInputType,
  ContractListSortInputTypeColumnEnum,
  SortOrderEnum,
} from '~/api'
import { automationApi } from '~/automations/common/automation.api'
import { autostakingApi } from '~/autostaking/common/autostaking.api'
import { lpTokensApi } from '~/lp-tokens/common/lp-tokens.api'
import { createUseInfiniteScroll } from '~/common/create-use-infinite-scroll'

export const fetchContractsFx = createEffect(
  async ({
    signal,
    ...variables
  }: AutostakingStakingContractsQueryVariables & {
    signal: AbortSignal
  }) => {
    const sort = (
      Array.isArray(variables.sort) ? variables.sort : [variables.sort]
    ).filter((sortItem): sortItem is ContractListSortInputType =>
      Boolean(sortItem)
    )

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
        sort: [
          ...sort,
          {
            column: ContractListSortInputTypeColumnEnum.AprYear,
            order: SortOrderEnum.Desc,
          },
          {
            column: ContractListSortInputTypeColumnEnum.Name,
            order: SortOrderEnum.Asc,
          },
        ],
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

export const autostakingStart = createEvent<string>()
export const autostakingEnd = createEvent<string>()

export const $autostaking = createStore<Record<string, boolean>>({})
  .on(autostakingStart, (state, payload) => ({ ...state, [payload]: true }))
  .on(autostakingEnd, (state, payload) => ({ ...state, [payload]: false }))
  .reset(resetContracts)

export const $contractsWithAutostakingLoading = combine(
  $contracts,
  $autostaking,
  (contracts, autostaking) =>
    contracts.map((contract) => ({
      ...contract,
      autostakingLoading: autostaking[contract.id],
    }))
)

export const resetProtocolsSelect = createEvent()

export const fetchProtocolsSelectFx = createEffect(
  ({
    signal,
    ...variables
  }: BuyLiquidityProtocolsSelectQueryVariables & { signal: AbortSignal }) =>
    lpTokensApi.protocolsSelect(variables, signal)
)

export const $protocolsSelect = createStore<
  UnitValue<typeof fetchProtocolsSelectFx.doneData>
>([])
  .on(fetchProtocolsSelectFx.doneData, (_, payload) => payload)
  .reset(resetProtocolsSelect)

const contractListDomain = createDomain()

export const useInfiniteScrollContracts = createUseInfiniteScroll({
  domain: contractListDomain,
  loading: fetchContractsFx.pending,
  items: $contracts,
})

sample({
  clock: fetchContractsFx.doneData,
  fn: (clock) => clock.count,
  target: useInfiniteScrollContracts.totalElements,
})

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

export const fetchBillingBalanceFx = createEffect(autostakingApi.billingBalance)
