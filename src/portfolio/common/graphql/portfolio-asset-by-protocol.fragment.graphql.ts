import { gql } from 'urql'

export const PORTFOLIO_ASSET_BY_PROTOCOL_FRAGMENT = gql`
  fragment portfolioAssetByProtocol on TokenAliasStakedStatistics {
    symbol
    name
    logoUrl
    metric {
      myPortfolioPercent
      myUSD
      myBalance
      myUSDChange {
        day
        week
      }
    }
  }
`
