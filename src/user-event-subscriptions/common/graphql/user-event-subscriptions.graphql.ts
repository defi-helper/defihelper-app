import { gql } from '@urql/core'

import { USER_EVENT_SUBSCRIPTION_FRAGMENT } from './user-event-subscriptions.fragment.graphql'

export const USER_EVENT_SUBSCRIPTIONS = gql`
  query UserEventSubscriptions(
    $userEventSubscriptionFilter: UserEventSubscriptionListQueryFilterInputType
    $userEventSubscriptionSort: [UserEventSubscriptionListSortInputType!]
    $userEventSubscriptionPagination: UserEventSubscriptionListPaginationInputType
  ) {
    userEventSubscriptions(
      filter: $userEventSubscriptionFilter
      sort: $userEventSubscriptionSort
      pagination: $userEventSubscriptionPagination
    ) {
      list {
        ...userEventSubscriptionFragment
      }
      pagination {
        count
      }
    }
  }
  ${USER_EVENT_SUBSCRIPTION_FRAGMENT}
`
