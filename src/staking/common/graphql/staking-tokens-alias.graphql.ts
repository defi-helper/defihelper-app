import { gql } from 'urql'

export const STAKING_TOKENS_ALIAS = gql`
  query StakingTokensAlias($protocol: BlockchainEnum!, $network: String) {
    tokensAlias(
      filter: {
        liquidity: stable
        blockchain: { protocol: $protocol, network: $network }
      }
    ) {
      list {
        tokens(
          filter: { blockchain: { protocol: $protocol, network: $network } }
        ) {
          list {
            symbol
            address
          }
        }
      }
    }
  }
`
