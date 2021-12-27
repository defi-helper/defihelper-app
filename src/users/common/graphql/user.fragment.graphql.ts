import { gql } from 'urql'

export const USER_FRAGMENT = gql`
  fragment user on UserType {
    id
    role
    id
    role
    createdAt
    wallets {
      list {
        id
        blockchain
        network
        address
      }
    }
  }
`
