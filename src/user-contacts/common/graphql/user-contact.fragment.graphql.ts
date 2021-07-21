import { gql } from '@urql/core'

export const USER_CONTACT_FRAGMENT = gql`
  fragment userContactFragment on UserContactType {
    id
    broker
    address
    status
    confirmationCode
    createdAt
    activatedAt
  }
`
