import { gql } from 'urql'

export const MY_METRIC = gql`
  query MyMetric {
    me {
      metric {
        stakedUSD
        earnedUSD
        worth
        apy
      }
    }
  }
`
