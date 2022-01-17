import { gql } from 'urql'

export const ON_WALLET_METRIC_UPDATED = gql`
  subscription OnWalletMetricUpdated($user: [UuidType!]) {
    onWalletMetricUpdated(filter: { user: $user }) {
      id
    }
  }
`
