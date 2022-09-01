import { gql } from 'urql'

export const WALLET_LIST_METRICS = gql`
  query WalletListMetrics(
    $sort: [WalletListSortInputType!]
    $pagination: WalletListPaginationInputType
  ) {
    me {
      wallets(filter: { type: wallet }, sort: $sort, pagination: $pagination) {
        list {
          id
          triggersCount
          metric(filter: { tokenAlias: { liquidity: [stable, unstable] } }) {
            stakedUSD
            earnedUSD
            usd
            worth
            worthChange {
              week
              day
            }
          }
          billing {
            balance {
              lowFeeFunds
              balance
              netBalance
              claim
              netBalanceUSD
            }
          }
        }
      }
    }
  }
`
