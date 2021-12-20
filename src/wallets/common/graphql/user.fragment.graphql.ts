import { gql } from '@urql/core'

export const USER_FRAGMENT = gql`
  fragment userFragment on UserType {
    id
    role
    createdAt
    tokenAliases(filter: {}, pagination: { limit: 1, offset: 0 }) {
      pagination {
        count
      }
    }
  }
`
