import { gql } from 'urql'

export const TOKEN_ALIAS_FRAGMENT = gql`
  fragment tokenAlias on TokenAlias {
    id
    name
    symbol
    logoUrl
    liquidity
  }
`
