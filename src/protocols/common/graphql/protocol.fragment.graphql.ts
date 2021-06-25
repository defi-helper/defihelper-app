import { gql } from '@urql/core'

import { PROTOCOL_CONTRACT_FRAGMENT } from './protocol-contract.fragment.graphql'

export const PROTOCOL_FRAGMENT = gql`
  fragment protocolFragment on ProtocolType {
    id
    adapter
    name
    description
    icon
    link
    hidden
    contracts(
      filter: $contractFilter
      sort: $contractSort
      pagination: $contractPagination
    ) {
      list {
        ...protocolContractFragment
      }
      pagination {
        count
      }
    }
    createdAt
  }

  ${PROTOCOL_CONTRACT_FRAGMENT}
`
