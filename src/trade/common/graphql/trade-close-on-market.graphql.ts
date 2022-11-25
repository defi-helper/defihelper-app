import { gql } from 'urql'

import { TRADE_ORDER_FRAGMENT } from './trade-order.fragment.graphql'

export const TRADE_CLOSE_ON_MARKET = gql`
  mutation TradeCloseOnMarket(
    $id: UuidType!
    $input: SmartTradeSwapOrderCloseInputType!
  ) {
    smartTradeSwapOrderClose(id: $id, input: $input) {
      ...tradeOrderFragment
    }
  }
  ${TRADE_ORDER_FRAGMENT}
`
