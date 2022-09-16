import { gql } from 'urql'

export const USER_FRAGMENT = gql`
  fragment userFragment on UserType {
    id
    role
    name
    createdAt
    timezone
    portfolioCollectingFreezedAt
  }
`
