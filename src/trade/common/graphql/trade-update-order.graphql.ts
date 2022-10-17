import { gql } from 'urql'

import { TRADE_ORDER_FRAGMENT } from './trade-order.fragment.graphql'

export const TRADE_UPDATE_ORDER = gql`
  mutation TradeUpdateOrder(
    $id: UuidType!
    $input: SmartTradeSwapOrderUpdateInputType!
  ) {
    smartTradeSwapOrderUpdate(id: $id, input: $input) {
      ...tradeOrderFragment
    }
  }
  ${TRADE_ORDER_FRAGMENT}
`
