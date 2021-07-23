import { getAPIClient } from '~/api'
import {
  UserEventSubscriptionCreateMutation,
  UserEventSubscriptionCreateMutationVariables,
  UserEventSubscriptionDeleteMutation,
  UserEventSubscriptionDeleteMutationVariables,
  UserEventSubscriptionsQuery,
  UserEventSubscriptionsQueryVariables,
} from '~/graphql/_generated-types'
import {
  USER_EVENT_SUBSCRIPTIONS,
  USER_EVENT_SUBSCRIPTION_CREATE,
  USER_EVENT_SUBSCRIPTION_DELETE,
} from './graphql'

export const userEventSubscriptionApi = {
  userEventSubscriptionList: (
    variables: UserEventSubscriptionsQueryVariables
  ) =>
    getAPIClient()
      .query<UserEventSubscriptionsQuery, UserEventSubscriptionsQueryVariables>(
        USER_EVENT_SUBSCRIPTIONS,
        variables
      )
      .toPromise()
      .then(({ data }) => data?.userEventSubscriptions.list ?? []),

  userEventSubscriptionCreate: (
    variables: UserEventSubscriptionCreateMutationVariables
  ) =>
    getAPIClient()
      .mutation<
        UserEventSubscriptionCreateMutation,
        UserEventSubscriptionCreateMutationVariables
      >(USER_EVENT_SUBSCRIPTION_CREATE, variables)
      .toPromise()
      .then(({ data }) => data?.userEventSubscriptionCreate),

  userEventSubscriptionDelete: (
    variables: UserEventSubscriptionDeleteMutationVariables
  ) =>
    getAPIClient()
      .mutation<
        UserEventSubscriptionDeleteMutation,
        UserEventSubscriptionDeleteMutationVariables
      >(USER_EVENT_SUBSCRIPTION_DELETE, variables)
      .toPromise()
      .then(({ data }) => data?.userEventSubscriptionDelete),
}
