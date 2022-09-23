import { gql } from 'urql'

export const PORTFOLIO_ASSET_BY_WALLET_FRAGMENT = gql`
  fragment portfolioAssetByWallet on WalletTokenAliasType {
    tokenAlias {
      id
      symbol
      name
      logoUrl
      liquidity
    }
    metric {
      portfolioPercent
      usd
      balance
      usdChange {
        day
      }
    }
  }
`
