import { gql } from 'urql'

export const PROPOSAL_VOTE_FRAGMENT = gql`
  fragment proposalVoteFragment on VoteType {
    id
    user {
      id
      createdAt
    }
    updatedAt
    createdAt
  }
`
