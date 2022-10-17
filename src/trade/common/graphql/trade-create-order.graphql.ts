import { gql } from 'urql'

import { TRADE_ORDER_FRAGMENT } from './trade-order.fragment.graphql'

export const TRADE_CREATE_ORDER = gql`
  mutation TradeCreateOrder($input: SmartTradeSwapOrderCreateInputType!) {
    smartTradeSwapOrderCreate(input: $input) {
      ...tradeOrderFragment
    }
  }
  ${TRADE_ORDER_FRAGMENT}
`
