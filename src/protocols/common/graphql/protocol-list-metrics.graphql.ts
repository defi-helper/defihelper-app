import { gql } from 'urql'

export const PROTOCOL_LIST_METRICS = gql`
  query ProtocolListMetrics(
    $filter: ProtocolListFilterInputType
    $sort: [ProtocolListSortInputType!]
    $pagination: ProtocolListPaginationInputType
  ) {
    protocols(filter: $filter, sort: $sort, pagination: $pagination) {
      list {
        id
        metric {
          tvl
          myAPY
          myStaked
          myEarned
          myMinUpdatedAt
          myAPYBoost
        }
      }
    }
  }
`
