import { gql } from 'urql'
import { PORTFOLIO_ASSET_FRAGMENT } from '~/portfolio/common/graphql/portfolio-asset.fragment.graphql'

export const ASSETS_LIST = gql`
  query AssetList {
    me {
      tokenAliases(
        pagination: { limit: 50 }
        filter: { liquidity: [stable, unstable] }
      ) {
        list {
          ...portfolioAsset
        }
      }
    }
  }
  ${PORTFOLIO_ASSET_FRAGMENT}
`
