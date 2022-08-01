import { gql } from 'urql'

export const PROPOSAL_VOTE = gql`
  mutation ProposalVote($proposal: UuidType!) {
    vote(proposal: $proposal) {
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
  }
`
