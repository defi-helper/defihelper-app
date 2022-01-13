import { gql } from 'urql'

import { PORTFOLIO_ASSET_FRAGMENT } from './portfolio-asset.fragment.graphql'

export const ASSETS_LIST_BY_PROTOCOL = gql`
  query AssetListByProtocol($protocolId: UuidType) {
    me {
      tokenAliases(
        pagination: { limit: 50 }
        filter: { liquidity: [stable, unstable], protocol: $protocolId }
      ) {
        list {
          ...portfolioAsset
        }
      }
    }
  }
  ${PORTFOLIO_ASSET_FRAGMENT}
`
