import { gql } from 'urql'

export const TRADE_ORDER_LIST = gql`
  query TradeOrderList(
    $filter: SmartTradeOrderListFilterInputType = {}
    $sort: [SmartTradeOrderListSortInputType!] = [
      { column: createdAt, order: asc }
    ]
    $pagination: SmartTradeOrderListPaginationInputType = {
      limit: 10
      offset: 0
    }
  ) {
    smartTradeOrders(filter: $filter, sort: $sort, pagination: $pagination) {
      list {
        id
        number
        owner {
          id
          network
          address
          name
        }
        handler
        callData {
          ... on SmartTradeMockHandlerCallDataType {
            amountIn
            amountOut
          }
          ... on SmartTradeSwapHandlerCallDataType {
            exchange
            boughtPrice
          }
        }
        status
        tx
        lastCall {
          status
          transaction
          errorReason
        }
        tokens {
          type
          token {
            id
            alias {
              id
              name
              logoUrl
              symbol
            }
            blockchain
            network
            address
            name
            symbol
            decimals
            priceFeed {
              ... on TokenPriceFeedCoingeckoIdType {
                id
                type
              }
              ... on TokenPriceFeedCoingeckoAddressType {
                type
                platform
                address
              }
            }
            priceFeedNeeded
          }
        }
        confirmed
        createdAt
      }
      pagination {
        count
      }
    }
  }
`
