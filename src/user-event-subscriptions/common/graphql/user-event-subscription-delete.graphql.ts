import { gql } from '@urql/core'

export const USER_EVENT_SUBSCRIPTION_DELETE = gql`
  mutation UserEventSubscriptionDelete($id: UuidType!) {
    userEventSubscriptionDelete(id: $id)
  }
`
