import {
  getAPIClient,
  AutostakingStakingContractsQuery,
  AutostakingStakingContractsQueryVariables,
  AutostakingUserUnlinkMutationVariables,
  AutostakingUserUnlinkMutation,
  AutostakingUserLinkMutation,
  AutostakingUserLinkMutationVariables,
  InvestStopLossEnableMutation,
  InvestStopLossEnableMutationVariables,
} from '~/api'
import { AUTOSTAKING_STAKING_CONTRACTS } from './graphql/autostaking-staking-contracts.graphql'
import { AUTOSTAKING_USER_LINK } from './graphql/autostaking-user-link.graphql'
import { AUTOSTAKING_USER_UNLINK } from './graphql/autostaking-user-unlink.graphql'
import { INVEST_STOP_LOSS_ENABLE } from './graphql/invest-stop-loss-enable.graphql'

export const investApi = {
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
          variables: {
            ...variables,
            filter: {
              ...variables.filter,
              deprecated: false,
            },
          },
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

  contractUserLink: (variables: AutostakingUserLinkMutationVariables) =>
    getAPIClient()
      .request<
        AutostakingUserLinkMutation,
        unknown,
        AutostakingUserLinkMutationVariables
      >({
        query: AUTOSTAKING_USER_LINK.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.contractUserLink),

  contractUserUnlink: (variables: AutostakingUserUnlinkMutationVariables) =>
    getAPIClient()
      .request<
        AutostakingUserUnlinkMutation,
        unknown,
        AutostakingUserUnlinkMutationVariables
      >({
        query: AUTOSTAKING_USER_UNLINK.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.contractUserUnlink),

  enableStopLoss: (variables: InvestStopLossEnableMutationVariables) =>
    getAPIClient()
      .request<
        InvestStopLossEnableMutation,
        unknown,
        InvestStopLossEnableMutationVariables
      >({
        query: INVEST_STOP_LOSS_ENABLE.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.automateContractStopLossEnable),
}
