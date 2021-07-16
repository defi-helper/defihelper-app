import { gql } from '@urql/core'

export const STAKING_TOKENS = gql`
  query StakingTokens($filter: TokenListQueryFilterInputType) {
    tokens(filter: $filter) {
      list {
        id
        alias
        blockchain
        network
        address
        name
        symbol
        decimals
      }
    }
  }
`
