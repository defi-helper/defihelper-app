import { gql } from 'urql'

export const PORTFOLIO_PROTOCOLS = gql`
  query PortfolioProtocols(
    $filter: UserProtocolListFilterInputType
    $pagination: UserProtocolListPaginationInputType
  ) {
    userProtocols(filter: $filter, pagination: $pagination) {
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
