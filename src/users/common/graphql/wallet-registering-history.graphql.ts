import { gql } from 'urql'

export const WALLET_REGISTERING_HISTORY = gql`
  query monitoringWalletsRegisteringHistory {
    monitoringWalletsRegisteringHistory {
      date
      number
    }
  }
`
