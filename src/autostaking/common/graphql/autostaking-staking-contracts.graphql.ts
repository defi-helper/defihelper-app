import { gql } from 'urql'

export const AUTOSTAKING_STAKING_CONTRACTS = gql`
  query AutostakingStakingContracts(
    $filter: ContractListFilterInputType = {}
    $sort: [ContractListSortInputType!] = [{ column: name, order: asc }]
    $pagination: ContractListPaginationInputType = { limit: 10, offset: 0 }
  ) {
    contracts(filter: $filter, sort: $sort, pagination: $pagination) {
      list {
        id
        protocol {
          id
          name
          icon
        }
        adapter
        layout
        blockchain
        network
        address
        deployBlockNumber
        name
        description
        link
        hidden
        deprecated
        metric(filter: { wallet: { type: [wallet] } }) {
          tvl
          aprDay
          aprWeek
          aprMonth
          aprYear
          myStaked
          aprWeekReal
          myAPYBoost
        }
        tokens {
          stake {
            alias {
              logoUrl
            }
            network
            address
            name
          }
        }
      }
      pagination {
        count
      }
    }
  }
`
