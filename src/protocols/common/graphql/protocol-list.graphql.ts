import { gql } from 'urql'

import { PROTOCOL_FRAGMENT } from './protocol.fragment.graphql'

export const PROTOCOLS = gql`
  query Protocols(
    $protocolFilter: ProtocolListFilterInputType
    $protocolSort: [ProtocolListSortInputType!]
    $protocolPagination: ProtocolListPaginationInputType
  ) {
    protocols(
      filter: $protocolFilter
      sort: $protocolSort
      pagination: $protocolPagination
    ) {
      list {
        ...protocolFragment
      }
      pagination {
        count
      }
    }
    favorites: protocols(filter: { favorite: true }) {
      pagination {
        count
      }
    }
    all: protocols {
      pagination {
        count
      }
    }
  }
  ${PROTOCOL_FRAGMENT}
`
