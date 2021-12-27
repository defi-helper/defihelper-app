import { gql } from 'urql'

export const USER_CONTACT_FRAGMENT = gql`
  fragment userContactFragment on UserContactType {
    id
    broker
    name
    address
    status
    confirmationCode
    createdAt
    activatedAt
  }
`
