import { gql } from 'urql'

import { TRADE_ORDER_FRAGMENT } from './trade-order.fragment.graphql'

export const TRADE_ORDER_LIST = gql`
  query TradeOrderList(
    $filter: SmartTradeOrderListFilterInputType = {}
    $sort: [SmartTradeOrderListSortInputType!] = [
      { column: createdAt, order: desc }
    ]
    $pagination: SmartTradeOrderListPaginationInputType = {
      limit: 10
      offset: 0
    }
  ) {
    smartTradeOrders(filter: $filter, sort: $sort, pagination: $pagination) {
      list {
        ...tradeOrderFragment
      }
      pagination {
        count
      }
    }
  }
  ${TRADE_ORDER_FRAGMENT}
`
