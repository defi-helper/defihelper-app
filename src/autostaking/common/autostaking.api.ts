import {
  getAPIClient,
  AutostakingStakingContractsQuery,
  AutostakingStakingContractsQueryVariables,
} from '~/api'
import { AUTOSTAKING_STAKING_CONTRACTS } from './graphql/autostaking-staking-contracts.graphql'

export const autostakingApi = {
  // protocolsSelect: (
  //   variables: BuyLiquidityProtocolsSelectQueryVariables,
  //   signal: AbortSignal
  // ) =>
  //   getAPIClient()
  //     .request<
  //       BuyLiquidityProtocolsSelectQuery,
  //       unknown,
  //       BuyLiquidityProtocolsSelectQueryVariables
  //     >(
  //       {
  //         query: BUY_LIQUIDITY_PROTOCOL_LIST_SELECT.loc?.source.body ?? '',
  //         variables,
  //       },
  //       {
  //         fetchOptionsOverrides: {
  //           signal,
  //         },
  //       }
  //     )
  //     .then(({ data }) => data?.protocols.list ?? []),

  contracts: (
    variables: AutostakingStakingContractsQueryVariables,
    signal: AbortSignal
  ) =>
    getAPIClient()
      .request<
        AutostakingStakingContractsQuery,
        unknown,
        AutostakingStakingContractsQueryVariables
      >(
        {
          query: AUTOSTAKING_STAKING_CONTRACTS.loc?.source.body ?? '',
          variables,
        },
        {
          fetchOptionsOverrides: {
            signal,
          },
        }
      )
      .then(({ data }) => ({
        list: data?.contracts.list ?? [],
        count: data?.contracts.pagination.count ?? 0,
      })),
}
