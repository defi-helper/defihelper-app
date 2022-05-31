import { gql } from 'urql'
import { TOKEN_ALIAS_FRAGMENT } from './token-alias.fragment.graphql'

export const TOKEN_FRAGMENT = gql`
  fragment token on TokenType {
    id
    alias {
      ...tokenAlias
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
    address
  }
  ${TOKEN_ALIAS_FRAGMENT}
`
