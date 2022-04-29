import { gql } from 'urql'

export const PROTOCOL_DFH_EARNING_HISTORY = gql`
  query protocolDfhEarningsHistory($network: String!) {
    protocolEarningsHistory(network: $network) {
      date
      number
    }
  }
`
