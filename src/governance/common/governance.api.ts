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
} from '~/graphql/_generated-types'
import {
  GOVERNANCE_PROPOSAL,
  GOVERNANCE_PROPOSALS,
  GOVERNANCE_RECEIPT,
  GOVERNANCE_VOTES,
} from './graphql'

export const governanceApi = {
  list: (variables: GovernanceProposalsQueryVariables) =>
    getAPIClient()
      .query<GovernanceProposalsQuery, GovernanceProposalsQueryVariables>(
        GOVERNANCE_PROPOSALS,
        variables
      )
      .toPromise()
      .then(({ data }) => ({
        list: data?.govProposals.list ?? [],
        count: data?.govProposals.pagination.count ?? 0,
      })),

  detail: (variables: GovernanceProposalQueryVariables) =>
    getAPIClient()
      .query<GovernanceProposalQuery, GovernanceProposalQueryVariables>(
        GOVERNANCE_PROPOSAL,
        variables
      )
      .toPromise()
      .then(({ data }) => data?.govProposal),

  receipt: (variables: GovernanceReceiptQueryVariables) =>
    getAPIClient()
      .query<GovernanceReceiptQuery, GovernanceReceiptQueryVariables>(
        GOVERNANCE_RECEIPT,
        variables
      )
      .toPromise()
      .then(({ data }) => data?.govReceipt),

  votes: (variables: GovernanceVotesQueryVariables) =>
    getAPIClient()
      .query<GovernanceVotesQuery, GovernanceVotesQueryVariables>(
        GOVERNANCE_VOTES,
        variables
      )
      .toPromise()
      .then(({ data }) => data?.govVotes),
}
