import { gql } from '@urql/core'

import { AUTOMATION_CONTRACT_FRAGMENT } from './automation-contract.fragment.graphql'

export const AUTOMATION_CONTRACTS = gql`
  query AutomationContracts(
    $filter: AutomateContractListFilterInputType
    $sort: [AutomateContractListSortInputType!]
    $pagination: AutomateContractListPaginationInputType
  ) {
    automateContracts(filter: $filter, sort: $sort, pagination: $pagination) {
      list {
        ...automationContractFragment
      }
      pagination {
        count
      }
    }
  }
  ${AUTOMATION_CONTRACT_FRAGMENT}
`
