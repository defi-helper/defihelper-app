import { gql } from '@urql/core'

export const PROPOSAL_VOTE_FRAGMENT = gql`
  fragment proposalVoteFragment on VoteType {
    id
    user {
      id
      createdAt
      wallets {
        list {
          id
          blockchain
          network
          address
          publicKey
          createdAt
        }
      }
    }
    updatedAt
    createdAt
  }
`
