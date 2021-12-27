import { gql } from 'urql'

export const ME = gql`
  query Me {
    me {
      id
      role
      createdAt
    }
  }
`
