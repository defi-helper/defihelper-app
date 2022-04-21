import { gql } from 'urql'
import { PORTFOLIO_ASSET_BY_PROTOCOL_FRAGMENT } from './portfolio-asset-by-protocol.fragment.graphql'

export const ASSETS_LIST_BY_PROTOCOL = gql`
  query AssetListByProtocol($protocolId: UuidType!) {
    me {
      tokenAliasesStakedMetrics(
        pagination: { limit: 50 }
        filter: { liquidity: [stable, unstable], protocol: $protocolId }
      ) {
        list {
          ...portfolioAssetByProtocol
        }
      }
    }
  }
  ${PORTFOLIO_ASSET_BY_PROTOCOL_FRAGMENT}
`
