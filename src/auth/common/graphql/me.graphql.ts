import { gql } from '@urql/core'

export const ME = gql`
  query Me {
    me {
      id
      role
      createdAt
    }
  }
`
