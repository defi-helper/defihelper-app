import { gql } from 'urql'

export const GOVERNANCE_VOTES = gql`
  query GovernanceVotes($filter: GovVotesFilterInputType!) {
    govVotes(filter: $filter) {
      votes
      delegates
    }
  }
`
