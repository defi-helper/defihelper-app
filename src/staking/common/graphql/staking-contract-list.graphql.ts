import { gql } from '@urql/core'

import { STAKING_CONTRACT_FRAGMENT } from './staking-contract.fragment.graphql'

export const STAKING_CONTRACT_LIST = gql`
  query StakingContractList(
    $filter: ProtocolFilterInputType!
    $contractFilter: ContractListFilterInputType
    $contractSort: [ContractListSortInputType!]
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
