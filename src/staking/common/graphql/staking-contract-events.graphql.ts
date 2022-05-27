import { gql } from 'urql'

export const STAKING_CONTRACTS_EVENTS = gql`
  query StakingContractEvents(
    $filter: ProtocolFilterInputType!
    $contractFilter: ContractListFilterInputType
    $contractSort: [ContractListSortInputType!]
    $contractPagination: ContractListPaginationInputType
  ) {
    protocol(filter: $filter) {
      contracts(
        filter: $contractFilter
        sort: $contractSort
        pagination: $contractPagination
      ) {
        list {
          id
          protocol {
            id
          }
          events
        }
      }
    }
  }
`
