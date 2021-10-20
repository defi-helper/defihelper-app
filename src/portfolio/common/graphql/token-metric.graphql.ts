import { gql } from '@urql/core'

export const TOKEN_METRIC = gql`
  query TokenMetric(
    $totalNetWorth: MetricColumnType! = stakingUSD
    $unclaimedReward: MetricColumnType! = earnedUSD
    $group: MetricGroupEnum! = day
    $filter: UserMetricChartFilterInputType = {}
    $sort: [UserMetricChartSortInputType!] = [{ column: date, order: asc }]
    $pagination: UserMetricChartPaginationInputType = { limit: 1 }
  ) {
    me {
      totalNetWorth: metricChart(
        metric: $totalNetWorth
        group: $group
        filter: $filter
        pagination: $pagination
        sort: $sort
      ) {
        sum
      }
      unclaimedReward: metricChart(
        metric: $unclaimedReward
        group: $group
        filter: $filter
        pagination: $pagination
        sort: $sort
      ) {
        sum
      }
    }
  }
`
