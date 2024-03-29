import { gql } from 'urql'

export const TRADE_ORDER_FRAGMENT = gql`
  fragment tradeOrderFragment on SmartTradeOrderType {
    id
    number
    closed
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
        swapPrice
        pair
        stopLoss {
          amountOut
          amountOutMin
          slippage
          moving
          activation {
            amountOut
            direction
            activated
          }
        }
        stopLoss2 {
          amountOut
          amountOutMin
          slippage
          moving
          activation {
            amountOut
            direction
            activated
          }
        }
        takeProfit {
          amountOut
          amountOutMin
          slippage
          moving
          activation {
            amountOut
            direction
            activated
          }
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
    balances {
      token {
        id
        alias {
          logoUrl
        }
        address
        symbol
      }
      balance
    }
  }
`
