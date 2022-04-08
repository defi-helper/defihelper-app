import { gql } from 'urql'

export const PORTFOLIO_PROTOCOLS = gql`
  query PortfolioProtocols(
    $filter: ProtocolListFilterInputType
    $sort: [ProtocolListSortInputType!]
    $pagination: ProtocolListPaginationInputType
  ) {
    protocols(filter: $filter, sort: $sort, pagination: $pagination) {
      list {
        id
        adapter
        name
        debankId
        icon
        link
        hidden
        createdAt
        favorite
        metric {
          tvl
          myAPY
          myStaked
          myEarned
          myMinUpdatedAt
          myAPYBoost
        }
      }
      pagination {
        count
      }
    }
  }
`
