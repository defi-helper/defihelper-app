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
          day
        }
        stakedUSDChange {
          day
        }
        earnedUSDChange {
          day
        }
        worthChange {
          day
        }
      }
    }
  }
`
