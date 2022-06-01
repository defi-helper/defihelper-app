import {
  createStore,
  createEvent,
  createEffect,
  UnitValue,
  createDomain,
  sample,
} from 'effector-logger/macro'

import {
  AutostakingStakingContractsQueryVariables,
  BuyLiquidityProtocolsSelectQueryVariables,
} from '~/api'
import { autostakingApi } from '~/autostaking/common/autostaking.api'
import { buyLiquidityApi } from '~/buy-liquidity/common/buy-liquidity.api'
import { createUseInfiniteScroll } from '~/common/create-use-infinite-scroll'

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
        filter: {
          ...variables.filter,
          hidden: false,
          automate: {
            autorestake: true,
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

export const resetProtocolsSelect = createEvent()

export const fetchProtocolsSelectFx = createEffect(
  ({
    signal,
    ...variables
  }: BuyLiquidityProtocolsSelectQueryVariables & { signal: AbortSignal }) =>
    buyLiquidityApi.protocolsSelect(variables, signal)
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
