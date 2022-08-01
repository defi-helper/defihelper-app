import { gql } from 'urql'

export const PROPOSAL_DETAIL = gql`
  query Proposal($filter: ProposalFilterInputType!) {
    proposal(filter: $filter) {
      id
      title
      description
      status
      releasedAt
      plannedAt
      author {
        id
        createdAt
      }
      tags
      updatedAt
      createdAt
      votes(pagination: { limit: 1000, offset: 0 }) {
        list {
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
    }
  }
`
