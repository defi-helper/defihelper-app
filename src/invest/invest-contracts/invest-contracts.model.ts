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
import { investApi } from '~/invest/common/invest.api'
import { lpTokensApi } from '~/lp-tokens/common/lp-tokens.api'
import { createUseInfiniteScroll } from '~/common/create-use-infinite-scroll'
import { config } from '~/config'

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

    const { list, count, error } = await investApi.contracts(
      {
        ...variables,
        filter: {
          ...variables.filter,
          hidden: false,
          automate: {
            ...variables.filter?.automate,
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

    if (error?.graphQLErrors?.[0].message) {
      throw new Error(error.graphQLErrors?.[0].message)
    }

    return {
      list,
      count,
    }
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

export const resetSelects = createEvent()

export const fetchProtocolsSelectFx = createEffect(
  ({
    signal,
    ...variables
  }: BuyLiquidityProtocolsSelectQueryVariables & { signal: AbortSignal }) =>
    lpTokensApi.protocolsSelect(
      { ...variables, automate: { autorestake: true } },
      signal
    )
)

export const $protocolsSelect = createStore<
  UnitValue<typeof fetchProtocolsSelectFx.doneData>
>([])
  .on(fetchProtocolsSelectFx.doneData, (_, payload) => payload)
  .reset(resetSelects)

export const fetchBlockchainsSelectFx = createEffect((signal: AbortSignal) =>
  lpTokensApi.blockchainsSelect(
    { testnet: config.IS_DEV ? undefined : false, autorestake: true },
    signal
  )
)

export const $blockchainsSelect = createStore<
  UnitValue<typeof fetchBlockchainsSelectFx.doneData>
>([])
  .on(fetchBlockchainsSelectFx.doneData, (_, payload) => payload)
  .reset(resetSelects)

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
