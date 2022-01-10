import { gql } from 'urql'

export const PORTFOLIO_ASSET_BY_WALLET_FRAGMENT = gql`
  fragment portfolioAssetByWallet on WalletTokenAliasType {
    tokenAlias {
      symbol
      name
      logoUrl
    }
    metric {
      portfolioPercent
      usd
      balance
    }
  }
`
