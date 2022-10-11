import {
  OnBillingTransferCreatedSubscription,
  OnBillingTransferCreatedSubscriptionVariables,
  OnBillingTransferUpdatedSubscription,
  OnBillingTransferUpdatedSubscriptionVariables,
  OnWalletCreatedSubscription,
  OnWalletCreatedSubscriptionVariables,
  OnUserContactActivatedSubscription,
  OnUserContactActivatedSubscriptionVariables,
} from '~/api'
import { subscriptionFactory } from '~/common/subscription-factory'
import {
  ON_BILLING_TRANSFER_CREATED,
  ON_BILLING_TRANSFER_UPDATED,
  ON_USER_CONTACT_ACTIVATED,
} from './graphql'
import { ON_WALLET_CREATED } from './graphql/on-wallet-created.graphql'

export const useOnBillingTransferCreatedSubscription = subscriptionFactory<
  OnBillingTransferCreatedSubscription,
  OnBillingTransferCreatedSubscriptionVariables
>({
  query: ON_BILLING_TRANSFER_CREATED.loc?.source.body ?? '',
})

export const useOnBillingTransferUpdatedSubscription = subscriptionFactory<
  OnBillingTransferUpdatedSubscription,
  OnBillingTransferUpdatedSubscriptionVariables
>({
  query: ON_BILLING_TRANSFER_UPDATED.loc?.source.body ?? '',
})

export const useOnWalletCreatedSubscription = subscriptionFactory<
  OnWalletCreatedSubscription,
  OnWalletCreatedSubscriptionVariables
>({
  query: ON_WALLET_CREATED.loc?.source.body ?? '',
})

export const useOnUserContactActivated = subscriptionFactory<
  OnUserContactActivatedSubscription,
  OnUserContactActivatedSubscriptionVariables
>({
  query: ON_USER_CONTACT_ACTIVATED.loc?.source.body ?? '',
})
