import { gql } from 'urql'

export const ON_TOKEN_METRIC_UPDATED = gql`
  subscription OnTokenMetricUpdated($user: [UuidType!]) {
    onTokenMetricUpdated(filter: { user: $user }) {
      id
    }
  }
`
