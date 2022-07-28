import { gql } from 'urql'

export const MY_METRIC = gql`
  query MyMetric {
    me {
      metric {
        stakedUSD
        earnedUSD
        worth
        apy
        balanceUSDChange {
          week
          day
        }
        stakedUSDChange {
          week
          day
        }
        earnedUSDChange {
          week
          day
        }
        worthChange {
          week
          day
        }
      }
    }
  }
`
