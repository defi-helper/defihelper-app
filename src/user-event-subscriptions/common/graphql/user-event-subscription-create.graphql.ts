import { gql } from '@urql/core'

import { USER_EVENT_SUBSCRIPTION_FRAGMENT } from './user-event-subscriptions.fragment.graphql'

export const USER_EVENT_SUBSCRIPTION_CREATE = gql`
  mutation UserEventSubscriptionCreate(
    $input: UserEventSubscriptionCreateInputType!
  ) {
    userEventSubscriptionCreate(input: $input) {
      ...userEventSubscriptionFragment
    }
  }
  ${USER_EVENT_SUBSCRIPTION_FRAGMENT}
`
