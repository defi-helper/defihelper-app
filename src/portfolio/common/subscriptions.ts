import {
  OnTokenMetricUpdatedSubscription,
  OnTokenMetricUpdatedSubscriptionVariables,
  OnWalletMetricUpdatedSubscription,
  OnWalletMetricUpdatedSubscriptionVariables,
} from '~/api'
import { subscriptionFactory } from '~/common/subscription-factory'
import { ON_TOKEN_METRIC_UPDATED, ON_WALLET_METRIC_UPDATED } from './graphql'

export const useOnTokenMetricUpdatedSubscription = subscriptionFactory<
  OnTokenMetricUpdatedSubscription,
  OnTokenMetricUpdatedSubscriptionVariables
>({
  query: ON_TOKEN_METRIC_UPDATED.loc?.source.body ?? '',
})

export const useOnWalletMetricUpdatedSubscription = subscriptionFactory<
  OnWalletMetricUpdatedSubscription,
  OnWalletMetricUpdatedSubscriptionVariables
>({
  query: ON_WALLET_METRIC_UPDATED.loc?.source.body ?? '',
})
