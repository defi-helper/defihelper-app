import { getAPIClient } from '~/api'
import {
  GovernanceProposalQuery,
  GovernanceProposalQueryVariables,
  GovernanceProposalsQuery,
  GovernanceProposalsQueryVariables,
  GovernanceReceiptQuery,
  GovernanceReceiptQueryVariables,
  GovernanceVotesQuery,
  GovernanceVotesQueryVariables,
} from '~/api/_generated-types'
import {
  GOVERNANCE_PROPOSAL,
  GOVERNANCE_PROPOSALS,
  GOVERNANCE_RECEIPT,
  GOVERNANCE_VOTES,
} from './graphql'

export const governanceApi = {
  list: (variables: GovernanceProposalsQueryVariables) =>
    getAPIClient()
      .request<
        GovernanceProposalsQuery,
        unknown,
        GovernanceProposalsQueryVariables
      >({
        query: GOVERNANCE_PROPOSALS.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => ({
        list: data?.govProposals.list ?? [],
        count: data?.govProposals.pagination.count ?? 0,
      })),

  detail: (variables: GovernanceProposalQueryVariables) =>
    getAPIClient()
      .request<
        GovernanceProposalQuery,
        unknown,
        GovernanceProposalQueryVariables
      >({
        query: GOVERNANCE_PROPOSAL.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.govProposal),

  receipt: (variables: GovernanceReceiptQueryVariables) =>
    getAPIClient()
      .request<
        GovernanceReceiptQuery,
        unknown,
        GovernanceReceiptQueryVariables
      >({
        query: GOVERNANCE_RECEIPT.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.govReceipt),

  votes: (variables: GovernanceVotesQueryVariables) =>
    getAPIClient()
      .request<GovernanceVotesQuery, unknown, GovernanceVotesQueryVariables>({
        query: GOVERNANCE_VOTES.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.govVotes),
}
