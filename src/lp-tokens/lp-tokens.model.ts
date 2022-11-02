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
import { config } from '~/config'
import { lpTokensApi } from './common/lp-tokens.api'

export const resetSelects = createEvent()

export const fetchProtocolsSelectFx = createEffect(
  ({
    signal,
    ...variables
  }: BuyLiquidityProtocolsSelectQueryVariables & { signal: AbortSignal }) =>
    lpTokensApi.protocolsSelect(
      { ...variables, automate: { lpTokensManager: true } },
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
            lpTokensManager: true,
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

export const zapFeePayCreateFx = createEffect(lpTokensApi.zapFeePayCreate)

export const resetContracts = createEvent()

export const fetchContractsFx = createEffect(
  ({
    signal,
    ...variables
  }: BuyLiquidityContractsQueryVariables & { signal: AbortSignal }) =>
    lpTokensApi.contracts(
      {
        ...variables,
        filter: {
          ...variables.filter,
          hidden: false,
          automate: {
            lpTokensManager: true,
          },
        },
        sort: [
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
