import { gql } from '@urql/core'

import { PROTOCOL_FRAGMENT } from './protocol.fragment.graphql'

export const PROTOCOL_UPDATE = gql`
  mutation ProtocolUpdate(
    $id: UuidType!
    $input: ProtocolUpdateInputType!
    $contractFilter: ContractListFilterInputType
    $contractSort: [ContractListSortInputType!]
    $contractPagination: ContractListPaginationInputType
  ) {
    protocolUpdate(id: $id, input: $input) {
      ...protocolFragment
    }
  }
  ${PROTOCOL_FRAGMENT}
`
