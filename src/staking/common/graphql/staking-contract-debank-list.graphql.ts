import { gql } from 'urql'

import { STAKING_CONTRACT_DEBANK_FRAGMENT } from './staking-contract-debank.fragment.graphql'

export const STAKING_CONTRACT_DEBANK_LIST = gql`
  query StakingContractDebankList(
    $filter: ProtocolFilterInputType!
    $contractFilter: ContractDebankListFilterInputType
    $contractSort: [ContractDebankListSortInputType!] = [
      { column: myStaked, order: desc }
      { column: name, order: asc }
    ]
    $contractPagination: ContractDebankListPaginationInputType
  ) {
    protocol(filter: $filter) {
      adapter
      contractsDebank(
        filter: $contractFilter
        sort: $contractSort
        pagination: $contractPagination
      ) {
        list {
          ...stakingContractDebankFragment
        }
        pagination {
          count
        }
      }
    }
  }
  ${STAKING_CONTRACT_DEBANK_FRAGMENT}
`
