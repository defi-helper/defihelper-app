import {
  createEvent,
  createEffect,
  createStore,
  UnitValue,
  createDomain,
  sample,
} from 'effector'
import {
  BuyLiquidityProtocolsQueryVariables,
  BuyLiquidityContractsQueryVariables,
  BuyLiquidityProtocolsSelectQueryVariables,
  SortOrderEnum,
  ContractListSortInputTypeColumnEnum,
} from '~/api'
import { createUseInfiniteScroll } from '~/common/create-use-infinite-scroll'
import { lpTokensApi } from './common/lp-tokens.api'

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

export const resetProtocols = createEvent()

export const fetchProtocolsFx = createEffect(
  ({
    signal,
    ...variables
  }: BuyLiquidityProtocolsQueryVariables & { signal: AbortSignal }) =>
    lpTokensApi.protocols(
      {
        ...variables,
        filter: {
          ...variables.filter,
          isDebank: false,
          hidden: false,
          automate: {
            buyLiquidity: true,
          },
        },
      },
      signal
    )
)

export const $protocols = createStore<
  UnitValue<typeof fetchProtocolsFx.doneData>
>([])
  .on(fetchProtocolsFx.doneData, (_, payload) => payload)
  .reset(resetProtocols)

export const resetContracts = createEvent()

export const fetchContractsFx = createEffect(
  ({
    signal,
    ...variables
  }: BuyLiquidityContractsQueryVariables & { signal: AbortSignal }) =>
    lpTokensApi.contracts(
      {
        ...variables,
        contractFilter: {
          ...variables.contractFilter,
          hidden: false,
          automate: {
            buyLiquidity: true,
          },
        },
        contractSort: [
          {
            column: ContractListSortInputTypeColumnEnum.AprYear,
            order: SortOrderEnum.Desc,
          },
        ],
      },
      signal
    )
)

export const $contracts = createStore<
  UnitValue<typeof fetchContractsFx.doneData>['list']
>([])
  .on(fetchContractsFx.doneData, (state, { list }) => [...state, ...list])
  .reset(resetContracts)

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
