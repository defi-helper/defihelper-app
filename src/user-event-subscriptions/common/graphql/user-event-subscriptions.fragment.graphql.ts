import { gql } from '@urql/core'

export const USER_EVENT_SUBSCRIPTION_FRAGMENT = gql`
  fragment userEventSubscriptionFragment on UserEventSubscriptionType {
    id
    contact {
      address
      broker
    }
    contract {
      id
      name
      blockchain
      network
    }
    event
  }
`
