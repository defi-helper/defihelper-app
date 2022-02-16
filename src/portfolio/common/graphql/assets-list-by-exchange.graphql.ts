import { gql } from 'urql'

import { PORTFOLIO_ASSET_BY_WALLET_FRAGMENT } from './portfolio-asset-by-wallet.fragment.graphql'

export const ASSETS_LIST_BY_EXCHANGE = gql`
  query AssetsListByExchange($exchangeId: UuidType) {
    me {
      exchanges(filter: { id: $exchangeId }) {
        list {
          tokenAliases(
            filter: { liquidity: [stable, unstable] }
            pagination: { limit: 100, offset: 0 }
          ) {
            list {
              ...portfolioAssetByWallet
            }
          }
        }
      }
    }
  }
  ${PORTFOLIO_ASSET_BY_WALLET_FRAGMENT}
`
