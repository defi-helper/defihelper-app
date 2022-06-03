import {
  getAPIClient,
  AutostakingStakingContractsQuery,
  AutostakingStakingContractsQueryVariables,
  BillingBalanceQuery,
  BillingBalanceQueryVariables,
  AutostakingUserUnlinkMutationVariables,
  AutostakingUserUnlinkMutation,
  AutostakingUserLinkMutation,
  AutostakingUserLinkMutationVariables,
} from '~/api'
import { AUTOSTAKING_BILLING_BALANCE } from './graphql/autostaking-billing-balance.graphql'
import { AUTOSTAKING_STAKING_CONTRACTS } from './graphql/autostaking-staking-contracts.graphql'
import { AUTOSTAKING_USER_LINK } from './graphql/autostaking-user-link.graphql'
import { AUTOSTAKING_USER_UNLINK } from './graphql/autostaking-user-unlink.graphql'

export const autostakingApi = {
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

  billingBalance: (variables: BillingBalanceQueryVariables) =>
    getAPIClient()
      .request<BillingBalanceQuery, unknown, BillingBalanceQueryVariables>({
        query: AUTOSTAKING_BILLING_BALANCE.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => ({
        priceUSD: data?.billingBalance.priceUSD,
        recomendedIncome: data?.billingBalance.recomendedIncome,
        token: data?.billingBalance.token,
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
}
