import { gql } from 'urql'

export const TOKEN_ALIASSES = gql`
  query TokenAliases {
    me {
      tokenAliases(filter: {}, pagination: { limit: 1, offset: 0 }) {
        pagination {
          count
        }
      }
    }
  }
`
