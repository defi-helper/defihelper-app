import { gql } from '@urql/core'

import { PROTOCOL_FRAGMENT } from './protocol.fragment.graphql'

export const PROTOCOL_CREATE = gql`
  mutation ProtocolCreate(
    $input: ProtocolCreateInputType!
    $contractFilter: ContractListFilterInputType
    $contractSort: [ContractListSortInputType!]
    $contractPagination: ContractListPaginationInputType
  ) {
    protocolCreate(input: $input) {
      ...protocolFragment
    }
  }
  ${PROTOCOL_FRAGMENT}
`
