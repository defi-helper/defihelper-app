import { gql } from 'urql'

export const TRADE_ORDER_FRAGMENT = gql`
  fragment tradeOrderFragment on SmartTradeOrderType {
    id
    number
    owner {
      id
      network
      address
      name
      blockchain
      billing {
        balance {
          lowFeeFunds
        }
      }
    }
    handler
    callData {
      ... on SmartTradeMockHandlerCallDataType {
        amountIn
        amountOut
      }
      ... on SmartTradeSwapHandlerCallDataType {
        amountIn
        exchange
        boughtPrice
        path
        stopLoss {
          amountOut
          amountOutMin
          slippage
        }
        takeProfit {
          amountOut
          amountOutMin
          slippage
        }
      }
    }
    claim
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
`
