import { gql } from '@urql/core'

export const PORTFOLIO_ASSET_FRAGMENT = gql`
  fragment portfolioAsset on TokenAlias {
    symbol
    name
    metric {
      myPortfolioPercent
      myUSD
      myBalance
    }
  }
`
