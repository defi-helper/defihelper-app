import { gql } from '@urql/core'

export const TOKEN_METRIC_CHART = gql`
  query TokenMetricChart(
    $metric: MetricColumnType!
    $group: MetricGroupEnum!
    $filter: UserTokenMetricChartFilterInputType
    $pagination: UserTokenMetricChartPaginationInputType
    $sort: [UserTokenMetricChartSortInputType!]
  ) {
    me {
      tokenMetricChart(
        metric: $metric
        group: $group
        filter: $filter
        pagination: $pagination
        sort: $sort
      ) {
        sum
        date
      }
    }
  }
`
