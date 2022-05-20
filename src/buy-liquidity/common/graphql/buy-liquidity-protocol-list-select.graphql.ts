import { gql } from 'urql'

export const BUY_LIQUIDITY_PROTOCOL_LIST_SELECT = gql`
  query BuyLiquidityProtocolsSelect(
    $search: String
    $sort: [ProtocolListSortInputType!]
    $pagination: ProtocolListPaginationInputType
  ) {
    protocols(
      filter: { isDebank: false, hidden: false, search: $search }
      sort: $sort
      pagination: $pagination
    ) {
      list {
        id
        name
        icon
      }
      pagination {
        count
      }
    }
  }
`
