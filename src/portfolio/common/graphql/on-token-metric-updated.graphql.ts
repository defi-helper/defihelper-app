import { gql } from 'urql'

export const ON_TOKEN_METRIC_UPDATED = gql`
  subscription OnTokenMetricUpdated($wallet: [UuidType!]) {
    onTokenMetricUpdated(filter: { wallet: $wallet }) {
      id
    }
  }
`
