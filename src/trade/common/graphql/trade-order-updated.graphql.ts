import { gql } from 'urql'

import { TRADE_ORDER_FRAGMENT } from './trade-order.fragment.graphql'

export const TRADE_ORDER_UPDATED = gql`
  subscription TradeOrderUpdated($user: UuidType!) {
    onSmartTradeOrderUpdated(filter: { user: $user }) {
      ...tradeOrderFragment
    }
  }
  ${TRADE_ORDER_FRAGMENT}
`
