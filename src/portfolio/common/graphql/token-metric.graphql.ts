import { gql } from '@urql/core'

export const TOKEN_METRIC = gql`
  query TokenMetric(
    $group: MetricGroupEnum! = day
    $filter: UserMetricChartFilterInputType = {}
    $sort: [UserMetricChartSortInputType!] = [{ column: date, order: asc }]
    $pagination: UserMetricChartPaginationInputType = { limit: 1 }
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
