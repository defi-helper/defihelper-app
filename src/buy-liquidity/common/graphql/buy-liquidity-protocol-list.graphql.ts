import { gql } from 'urql'

export const BUY_LIQUIDITY_PROTOCOL_LIST = gql`
  query BuyLiquidityProtocols(
    $filter: ProtocolListFilterInputType
    $sort: [ProtocolListSortInputType!]
    $pagination: ProtocolListPaginationInputType
  ) {
    protocols(filter: $filter, sort: $sort, pagination: $pagination) {
      list {
        id
        name
        icon
        metric {
          tvl
        }
      }
      pagination {
        count
      }
    }
  }
`
