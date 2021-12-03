import { gql } from '@urql/core'

export const STAKING_AUTOMATES_CONTRACTS = gql`
  query StakingAutomatesContracts(
    $sort: [AutomateContractListSortInputType!]
    $pagination: AutomateContractListPaginationInputType
  ) {
    automateContracts(sort: $sort, pagination: $pagination) {
      list {
        id
        protocol {
          adapter
        }
        contract {
          id
          protocolId
          adapter
          layout
          blockchain
          network
          address
          deployBlockNumber
          automates
          name
          description
          link
          hidden
          metric {
            tvl
            aprYear
            myStaked
            myEarned
          }
          events
          createdAt
        }
        address
        contractWallet {
          id
        }
        adapter
        initParams
        verification
        rejectReason
      }
      pagination {
        count
      }
    }
  }
`
