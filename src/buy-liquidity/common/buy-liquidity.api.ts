import { getAPIClient } from '~/api'
import {
  BuyLiquidityProtocolsQuery,
  BuyLiquidityProtocolsQueryVariables,
  BuyLiquidityContractsQuery,
  BuyLiquidityContractsQueryVariables,
  BuyLiquidityProtocolsSelectQuery,
  BuyLiquidityProtocolsSelectQueryVariables,
} from '~/api/_generated-types'
import { BUY_LIQUIDITY_CONTRACT_LIST } from './graphql/buy-liquidity-contract-list.graphql'
import { BUY_LIQUIDITY_PROTOCOL_LIST_SELECT } from './graphql/buy-liquidity-protocol-list-select.graphql'
import { BUY_LIQUIDITY_PROTOCOL_LIST } from './graphql/buy-liquidity-protocol-list.graphql'

export const buyLiquidityApi = {
  protocols: (
    variables: BuyLiquidityProtocolsQueryVariables,
    signal: AbortSignal
  ) =>
    getAPIClient()
      .request<
        BuyLiquidityProtocolsQuery,
        unknown,
        BuyLiquidityProtocolsQueryVariables
      >(
        {
          query: BUY_LIQUIDITY_PROTOCOL_LIST.loc?.source.body ?? '',
          variables,
        },
        {
          fetchOptionsOverrides: {
            signal,
          },
        }
      )
      .then(({ data }) => data?.protocols.list ?? []),

  protocolsSelect: (
    variables: BuyLiquidityProtocolsSelectQueryVariables,
    signal: AbortSignal
  ) =>
    getAPIClient()
      .request<
        BuyLiquidityProtocolsSelectQuery,
        unknown,
        BuyLiquidityProtocolsSelectQueryVariables
      >(
        {
          query: BUY_LIQUIDITY_PROTOCOL_LIST_SELECT.loc?.source.body ?? '',
          variables,
        },
        {
          fetchOptionsOverrides: {
            signal,
          },
        }
      )
      .then(({ data }) => data?.protocols.list ?? []),

  contracts: (
    variables: BuyLiquidityContractsQueryVariables,
    signal: AbortSignal
  ) =>
    getAPIClient()
      .request<
        BuyLiquidityContractsQuery,
        unknown,
        BuyLiquidityContractsQueryVariables
      >(
        {
          query: BUY_LIQUIDITY_CONTRACT_LIST.loc?.source.body ?? '',
          variables,
        },
        {
          fetchOptionsOverrides: {
            signal,
          },
        }
      )
      .then(({ data }) => ({
        list: data?.protocol?.contracts.list ?? [],
        count: data?.protocol?.contracts.pagination.count ?? 0,
      })),
}
