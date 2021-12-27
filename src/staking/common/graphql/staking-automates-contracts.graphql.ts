import { gql } from 'urql'

export const STAKING_AUTOMATES_CONTRACTS = gql`
  query StakingAutomatesContracts(
    $filter: AutomateContractListFilterInputType
    $sort: [AutomateContractListSortInputType!]
    $pagination: AutomateContractListPaginationInputType
  ) {
    automateContracts(filter: $filter, sort: $sort, pagination: $pagination) {
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
          automate {
            adapters
            autorestake
          }
          name
          description
          link
          hidden
          metric {
            tvl
            aprYear
            myStaked
            myEarned
            myAPYBoost
          }
          events
          createdAt
        }
        address
        contractWallet {
          id
          network
          address
          metric {
            stakedUSD
          }
        }
        wallet {
          id
          network
          address
          blockchain
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
