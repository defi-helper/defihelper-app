import { gql } from 'urql'

export const ON_WALLET_METRIC_UPDATED = gql`
  subscription OnWalletMetricUpdated($wallet: [UuidType!]) {
    onWalletMetricUpdated(filter: { wallet: $wallet }) {
      id
    }
  }
`
