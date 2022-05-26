import { gql } from 'urql'

export const TOKEN_FRAGMENT = gql`
  fragment token on TokenType {
    id
    alias {
      id
      name
      symbol
    }
    name
    decimals
    symbol
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
    network
  }
`
