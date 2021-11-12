import { gql } from '@urql/core'

export const PORTFOLIO_ESTIMATED = gql`
  query PortfolioEstimated($balance: Float!, $apy: Float!) {
    restakeStrategy(balance: $balance, apy: $apy) {
      hold {
        v
        t
      }
      everyDay {
        v
        t
      }
      optimal {
        v
        t
      }
    }
  }
`
