import { gql } from 'urql'

export const PROTOCOL_DFH_EARNING_HISTORY = gql`
  query monitoringProtocolDfhEarningsHistory($network: String!) {
    monitoringProtocolEarningsHistory(network: $network) {
      date
      number
    }
  }
`
