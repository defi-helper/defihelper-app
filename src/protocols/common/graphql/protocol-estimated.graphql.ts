import { gql } from '@urql/core'

export const PROTOCOL_ESTIMATED = gql`
  query ProtocolEstimated($balance: Float!, $apy: Float!) {
    restakeStrategy(balance: $balance, apy: $apy) {
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
