import { gql } from 'urql'

export const BUY_LIQUIDITY_CONTRACT_LIST = gql`
  query BuyLiquidityContracts(
    $filter: ContractListFilterInputType
    $sort: [ContractListSortInputType!] = [
      { column: myStaked, order: desc }
      { column: name, order: asc }
    ]
    $pagination: ContractListPaginationInputType
  ) {
    contracts(filter: $filter, sort: $sort, pagination: $pagination) {
      list {
        id
        address
        name
        network
        blockchain
        protocol {
          adapter
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
          reward {
            alias {
              logoUrl
            }
            network
            address
            name
          }
        }
        automate {
          buyLiquidity {
            router
            pair
          }
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
        }
      }
      pagination {
        count
      }
    }
  }
`
