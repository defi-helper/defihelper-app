import {
  TradeOrderUpdatedSubscription,
  TradeOrderUpdatedSubscriptionVariables,
} from '~/api'
import { subscriptionFactory } from '~/common/subscription-factory'
import { TRADE_ORDER_UPDATED } from './graphql/trade-order-updated.graphql'

export const useTradeUpdated = subscriptionFactory<
  TradeOrderUpdatedSubscription,
  TradeOrderUpdatedSubscriptionVariables
>({
  query: TRADE_ORDER_UPDATED.loc?.source.body ?? '',
})
