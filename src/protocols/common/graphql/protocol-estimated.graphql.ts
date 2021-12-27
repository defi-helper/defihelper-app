import { gql } from 'urql'

export const PROTOCOL_ESTIMATED = gql`
  query ProtocolEstimated(
    $balance: Float!
    $apy: Float!
    $blockchain: BlockchainEnum = ethereum
    $network: String = "1"
  ) {
    restakeStrategy(
      balance: $balance
      apy: $apy
      blockchain: $blockchain
      network: $network
    ) {
      hold {
        v
        t
      }
      everyDay {
        v
        t
      }
      optimal {
        v
        t
      }
    }
  }
`
