import { gql } from 'urql'

export const PORTFOLIO_ASSET_FRAGMENT = gql`
  fragment portfolioAsset on TokenAlias {
    id
    symbol
    name
    logoUrl
    liquidity
    metric {
      myPortfolioPercent
      myUSD
      myBalance
      myUSDChange {
        day
      }
    }
  }
`
