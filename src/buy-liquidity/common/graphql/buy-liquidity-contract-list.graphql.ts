import { gql } from 'urql'

export const BUY_LIQUIDITY_CONTRACT_LIST = gql`
  query BuyLiquidityContracts(
    $filter: ProtocolFilterInputType!
    $contractFilter: ContractListFilterInputType
    $contractSort: [ContractListSortInputType!] = [
      { column: myStaked, order: desc }
      { column: name, order: asc }
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
          id
          address
          name
          network
          blockchain
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
  }
`
