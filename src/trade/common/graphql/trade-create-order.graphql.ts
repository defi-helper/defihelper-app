import { gql } from 'urql'

export const TRADE_CREATE_ORDER = gql`
  mutation TradeCreateOrder($input: SmartTradeSwapOrderCreateInputType!) {
    smartTradeSwapOrderCreate(input: $input) {
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
          path
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
  }
`
