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
          adapter
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
        watcherId
        automate {
          autorestake
          lpTokensManager {
            router
            pair
          }
        }
        metric(filter: { wallet: { type: [wallet] } }) {
          tvl
          aprDay
          aprWeek
          aprMonth
          aprYear
          myStaked
          aprWeekReal
          myAPYBoost
          risk {
            totalRate
            reliabilityRate
            profitabilityRate
            volatilityRate
            total
            reliability
            profitability
            volatility
          }
        }
        tokens {
          stakeBase {
            address
            symbol
          }
          stake {
            alias {
              logoUrl
            }
            network
            address
            name
            symbol
          }
          reward {
            alias {
              logoUrl
            }
            network
            address
            name
            symbol
          }
        }
      }
      pagination {
        count
      }
    }
  }
`
