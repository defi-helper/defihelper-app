import { gql } from 'urql'

export const PORTFOLIO_PROTOCOLS = gql`
  query PortfolioProtocols(
    $filter: UserProtocolListFilterInputType!
    $sort: [UserProtocolListSortInputType!]
    $pagination: UserProtocolListPaginationInputType
  ) {
    userProtocols(filter: $filter, sort: $sort, pagination: $pagination) {
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
          myAPY
          myStaked
          myEarned
        }
      }
      pagination {
        count
      }
    }
  }
`
