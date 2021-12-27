import { gql } from 'urql'

export const PORTFOLIO_ASSET_FRAGMENT = gql`
  fragment portfolioAsset on TokenAlias {
    symbol
    name
    logoUrl
    metric {
      myPortfolioPercent
      myUSD
      myBalance
    }
  }
`
