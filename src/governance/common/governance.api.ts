import { getAPIClient } from '~/api'
import {
  GovernanceProposalQuery,
  GovernanceProposalQueryVariables,
  GovernanceProposalsQuery,
  GovernanceProposalsQueryVariables,
} from '~/graphql/_generated-types'
import { GOVERNANCE_PROPOSAL, GOVERNANCE_PROPOSALS } from './graphql'

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
}
