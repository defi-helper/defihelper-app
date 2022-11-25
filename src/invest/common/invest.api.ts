import {
  getAPIClient,
  AutostakingStakingContractsQuery,
  AutostakingStakingContractsQueryVariables,
  AutostakingUserUnlinkMutationVariables,
  AutostakingUserUnlinkMutation,
  AutostakingUserLinkMutation,
  AutostakingUserLinkMutationVariables,
  AutomateInvestCreateMutationVariables,
  AutomateInvestCreateMutation,
  AutomateInvestRefundMutation,
  AutomateInvestRefundMutationVariables,
  InvestTagsQuery,
  InvestTagsQueryVariables,
} from '~/api'
import { AUTOMATE_INVEST_CREATE } from './graphql/automate-invest-create.graphql'
import { AUTOMATE_INVEST_REFUND } from './graphql/automate-invest-refund.graphql'
import { AUTOSTAKING_STAKING_CONTRACTS } from './graphql/autostaking-staking-contracts.graphql'
import { AUTOSTAKING_USER_LINK } from './graphql/autostaking-user-link.graphql'
import { AUTOSTAKING_USER_UNLINK } from './graphql/autostaking-user-unlink.graphql'
import { INVEST_TAGS } from './graphql/invest-tags.graphql'

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
      .then(({ data, error }) => ({
        list: data?.contracts.list ?? [],
        count: data?.contracts.pagination.count ?? 0,
        error,
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

  automateInvestCreate: (variables: AutomateInvestCreateMutationVariables) =>
    getAPIClient()
      .request<
        AutomateInvestCreateMutation,
        unknown,
        AutomateInvestCreateMutationVariables
      >({
        query: AUTOMATE_INVEST_CREATE.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.automateInvestCreate),

  automateInvestRefund: (variables: AutomateInvestRefundMutationVariables) =>
    getAPIClient()
      .request<
        AutomateInvestRefundMutation,
        unknown,
        AutomateInvestRefundMutationVariables
      >({
        query: AUTOMATE_INVEST_REFUND.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.automateInvestRefund),

  investTags: (variables: InvestTagsQueryVariables = {}) =>
    getAPIClient()
      .request<InvestTagsQuery, unknown, InvestTagsQueryVariables>({
        query: INVEST_TAGS.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => {
        return data?.tags ?? []
      }),
}
