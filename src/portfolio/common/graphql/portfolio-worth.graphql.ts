import { gql } from '@urql/core'

export const PORTFOLIO_WORTH = gql`
  query PortfolioWorth($balance: Float!, $apy: Float!) {
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
