import { gql } from '@urql/core'

export const USER_FRAGMENT = gql`
  fragment user on UserType {
    id
    role
    id
    role
    createdAt
    wallets(filter: $filter, sort: $sort, pagination: $pagination) {
      list {
        id
        blockchain
        network
        address
      }
    }
  }
`
