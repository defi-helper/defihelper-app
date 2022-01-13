import { gql } from 'urql'

import { PROTOCOL_FRAGMENT } from './protocol.fragment.graphql'

export const PROTOCOLS = gql`
  query Protocols(
    $filter: ProtocolListFilterInputType
    $sort: [ProtocolListSortInputType!]
    $pagination: ProtocolListPaginationInputType
    $hidden: Boolean
  ) {
    protocols(filter: $filter, sort: $sort, pagination: $pagination) {
      list {
        ...protocolFragment
      }
      pagination {
        count
      }
    }
    favorites: protocols(filter: { hidden: $hidden, favorite: true }) {
      pagination {
        count
      }
    }
    all: protocols(filter: { hidden: $hidden }) {
      pagination {
        count
      }
    }
  }
  ${PROTOCOL_FRAGMENT}
`
