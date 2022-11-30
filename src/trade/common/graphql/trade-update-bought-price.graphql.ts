import { gql } from 'urql'

import { TRADE_ORDER_FRAGMENT } from './trade-order.fragment.graphql'

export const TRADE_UPDATE_BOUGHT_PRICE = gql`
  mutation TradeUpdateBoughtPrice(
    $id: UuidType!
    $input: SmartTradeSwapOrderSetBoughtPriceInputType!
  ) {
    smartTradeSwapOrderSetBoughtPrice(id: $id, input: $input) {
      ...tradeOrderFragment
    }
  }
  ${TRADE_ORDER_FRAGMENT}
`
