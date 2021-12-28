import { gql } from 'urql'

import { PORTFOLIO_ASSET_FRAGMENT } from './portfolio-asset.fragment.graphql'

export const ASSETS_LIST_BY_WALLET = gql`
  query AssetsListByWallet($walletId: UuidType) {
    me {
      wallets(filter: { id: $walletId }) {
        list {
          tokenAliases(
            filter: { liquidity: [stable, unstable] }
            pagination: { limit: 100, offset: 0 }
          ) {
            list {
              ...portfolioAsset
            }
          }
        }
      }
    }
  }
  ${PORTFOLIO_ASSET_FRAGMENT}
`
