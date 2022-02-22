import { gql } from 'urql'

export const STAKING_TOKENS = gql`
  query StakingTokens($protocol: BlockchainEnum!, $network: String) {
    tokens(
      filter: {
        tradable: true
        blockchain: { protocol: $protocol, network: $network }
      }
    ) {
      list {
        id
        alias {
          logoUrl
        }
        symbol
        address
      }
    }
  }
`
