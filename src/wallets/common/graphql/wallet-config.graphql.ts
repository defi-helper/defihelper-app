import { gql } from 'urql'

export const WALLET_CONFIG = gql`
  query WalletConfig {
    config {
      blockchain {
        ethereum {
          id
          title
          testnet
          explorerURL
          coin
          decimals
          blockchain
          icon
        }
        waves {
          id
          title
          testnet
          explorerURL
          coin
          decimals
          blockchain
          icon
        }
      }
    }
  }
`
