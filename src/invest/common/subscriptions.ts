import {
  OnAutomateContractUpdatedSubscription,
  OnAutomateContractUpdatedSubscriptionVariables,
} from '~/api'
import { subscriptionFactory } from '~/common/subscription-factory'
import { ON_AUTOMATE_CONTRACT_UPDATED } from './graphql/on-automate-contract-updated.graphql'

export const useOnAutomateContractUpdatedSubscription = subscriptionFactory<
  OnAutomateContractUpdatedSubscription,
  OnAutomateContractUpdatedSubscriptionVariables
>({
  query: ON_AUTOMATE_CONTRACT_UPDATED.loc?.source.body ?? '',
})
