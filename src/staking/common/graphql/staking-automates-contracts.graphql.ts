import { gql } from 'urql'

import { STAKING_AUTOMATES_CONTRACT_FRAGMENT } from './staking-automates-contract.fragment.graphql'

export const STAKING_AUTOMATES_CONTRACTS = gql`
  query StakingAutomatesContracts(
    $filter: AutomateContractListFilterInputType
    $sort: [AutomateContractListSortInputType!]
    $pagination: AutomateContractListPaginationInputType
  ) {
    automateContracts(filter: $filter, sort: $sort, pagination: $pagination) {
      list {
        ...stakingAutomatesContractFragment
      }
      pagination {
        count
      }
    }
  }
  ${STAKING_AUTOMATES_CONTRACT_FRAGMENT}
`
