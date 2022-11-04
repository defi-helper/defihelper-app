import { gql } from 'urql'

import { TRADE_ORDER_FRAGMENT } from './trade-order.fragment.graphql'

export const TRADE_CLAIM_ORDER = gql`
  mutation TradeClaimOrder($id: UuidType!) {
    smartTradeClaim(id: $id) {
      ...tradeOrderFragment
    }
  }
  ${TRADE_ORDER_FRAGMENT}
`
