import { gql } from '@urql/core'

export const GOVERNANCE_VOTES = gql`
  query GovernanceVotes($filter: GovVotesFilterInputType!) {
    govVotes(filter: $filter) {
      votes
      delegates
    }
  }
`
