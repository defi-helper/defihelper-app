import { gql } from 'urql'

import { TRADE_ORDER_FRAGMENT } from './trade-order.fragment.graphql'

export const TRADE_CANCEL_ORDER = gql`
  mutation TradeCancelOrder($id: UuidType!) {
    smartTradeCancel(id: $id) {
      ...tradeOrderFragment
    }
  }
  ${TRADE_ORDER_FRAGMENT}
`
