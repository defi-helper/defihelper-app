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
        swapPrice
        stopLoss {
          amountOut
          amountOutMin
          slippage
          moving
        }
        activate {
          amountOut
          direction
        }
        stopLoss2 {
          amountOut
          amountOutMin
          slippage
          moving
        }
        takeProfit {
          amountOut
          amountOutMin
          slippage
          moving
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
