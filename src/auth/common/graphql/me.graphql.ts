import { gql } from '@urql/core'

export const ME = gql`
  query Me {
    me {
      id
      role
      createdAt
      tokenAliases(filter: {}, pagination: { limit: 1, offset: 0 }) {
        pagination {
          count
        }
      }
    }
  }
`
