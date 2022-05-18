import { createEvent } from 'effector'
import { createEffect, createStore, UnitValue } from 'effector-logger/macro'
import {
  BuyLiquidityProtocolsQueryVariables,
  BuyLiquidityContractsQueryVariables,
  BuyLiquidityProtocolsSelectQueryVariables,
} from '~/api'
import { buyLiquidityApi } from './common/buy-liquidity.api'

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

export const resetProtocols = createEvent()

export const fetchProtocolsFx = createEffect(
  ({
    signal,
    ...variables
  }: BuyLiquidityProtocolsQueryVariables & { signal: AbortSignal }) =>
    buyLiquidityApi.protocols(
      {
        ...variables,
        filter: {
          ...variables.filter,
          isDebank: false,
          hidden: false,
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
    buyLiquidityApi.contracts(
      {
        ...variables,
        contractFilter: {
          ...variables.contractFilter,
          hidden: false,
          automate: {
            buyLiquidity: true,
          },
        },
      },
      signal
    )
)

export const $contracts = createStore<
  UnitValue<typeof fetchContractsFx.doneData>
>([])
  .on(fetchContractsFx.doneData, (_, payload) => payload)
  .reset(resetContracts)
