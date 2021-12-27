import { gql } from 'urql'

import { STAKING_CONTRACT_FRAGMENT } from './staking-contract.fragment.graphql'

export const STAKING_CONTRACT_LIST = gql`
  query StakingContractList(
    $filter: ProtocolFilterInputType!
    $contractFilter: ContractListFilterInputType
    $contractSort: [ContractListSortInputType!] = [
      { column: myStaked, order: desc }
    ]
    $contractPagination: ContractListPaginationInputType
  ) {
    protocol(filter: $filter) {
      adapter
      contracts(
        filter: $contractFilter
        sort: $contractSort
        pagination: $contractPagination
      ) {
        list {
          ...stakingContractFragment
        }
        pagination {
          count
        }
      }
    }
  }
  ${STAKING_CONTRACT_FRAGMENT}
`
