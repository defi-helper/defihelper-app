import { gql } from '@urql/core'

export const TOKEN_METRIC = gql`
  query TokenMetric(
    $group: MetricGroupEnum! = day
    $filter: UserMetricChartFilterInputType = {}
    $sort: [UserMetricChartSortInputType!] = [{ column: date, order: asc }]
    $pagination: UserMetricChartPaginationInputType = { limit: 1 }
    $balanceSort: [UserTokenMetricChartSortInputType!] = [
      { column: date, order: asc }
    ]
    $balancePagination: UserTokenMetricChartPaginationInputType = { limit: 1 }
  ) {
    me {
      totalNetWorth: metricChart(
        metric: stakingUSD
        group: $group
        filter: $filter
        pagination: $pagination
        sort: $sort
      ) {
        date
        sum
      }
      earnedUSD: metricChart(
        metric: earnedUSD
        group: $group
        filter: $filter
        pagination: $pagination
        sort: $sort
      ) {
        date
        sum
      }
      balanceUSD: tokenMetricChart(
        metric: "usd"
        group: $group
        filter: { tokenAlias: { liquidity: [stable, unstable] } }
        pagination: $balancePagination
        sort: $balanceSort
      ) {
        date
        sum
      }
      onWallets: metricChart(
        metric: earnedUSD
        group: $group
        filter: $filter
        pagination: $pagination
        sort: $sort
      ) {
        date
        sum
      }
    }
  }
`
