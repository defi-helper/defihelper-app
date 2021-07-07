import { gql } from '@urql/core'

export const BLOCKCHAINS = gql`
  query BlockChains(
    $blockchainMetric: MetricColumnType!
    $blockchainGroup: MetricGroupEnum!
    $blockchainPagination: UserBlockchainWalletTokenMetricChartPaginationInputType
    $blockchainSort: [UserBlockchainWalletTokenMetricChartSortInputType!]
    $blockchainWalletMetric: MetricColumnType!
    $blockchainWalletGroup: MetricGroupEnum!
    $blockchainWalletSort: [WalletTokenMetricChartSortInputType!]
    $blockchainWalletPagination: WalletTokenMetricChartPaginationInputType
  ) {
    me {
      blockchains {
        name
        blockchain
        network
        tokenMetricChart(
          metric: $blockchainMetric
          group: $blockchainGroup
          pagination: $blockchainPagination
          sort: $blockchainSort
        ) {
          date
          sum
        }
        wallets {
          list {
            id
            network
            blockchain
            address
            tokenMetricChart(
              metric: $blockchainWalletMetric
              group: $blockchainWalletGroup
              pagination: $blockchainWalletPagination
              sort: $blockchainWalletSort
            ) {
              date
              sum
            }
          }
        }
      }
    }
  }
`
