import { gql } from 'urql'

import { PROTOCOL_FRAGMENT } from './protocol.fragment.graphql'

export const PROTOCOLS = gql`
  query Protocols(
    $filter: ProtocolListFilterInputType
    $sort: [ProtocolListSortInputType!]
    $pagination: ProtocolListPaginationInputType
  ) {
    protocols(filter: $filter, sort: $sort, pagination: $pagination) {
      list {
        ...protocolFragment
      }
      pagination {
        count
      }
    }
  }
  ${PROTOCOL_FRAGMENT}
`
