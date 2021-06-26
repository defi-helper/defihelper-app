import { gql } from '@urql/core'

import { PROTOCOL_FRAGMENT } from './protocol.fragment.graphql'

export const PROTOCOLS = gql`
  query Protocols(
    $protocolFilter: ProtocolListFilterInputType
    $protocolSort: [ProtocolListSortInputType!]
    $protocolPagination: ProtocolListPaginationInputType
    $contractFilter: ContractListFilterInputType
    $contractSort: [ContractListSortInputType!]
    $contractPagination: ContractListPaginationInputType
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
  }
  ${PROTOCOL_FRAGMENT}
`
