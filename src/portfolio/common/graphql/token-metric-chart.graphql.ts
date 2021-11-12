import { gql } from '@urql/core'

export const TOKEN_METRIC_CHART = gql`
  query TokenMetricChart(
    $group: MetricGroupEnum!
    $dateAfter: DateTimeType
    $dateBefore: DateTimeType
    $pagination: UserTokenMetricChartPaginationInputType
    $sort: [UserTokenMetricChartSortInputType!]
  ) {
    me {
      altCoins: tokenMetricChart(
        metric: usd
        group: $group
        filter: {
          dateAfter: $dateAfter
          dateBefore: $dateBefore
          tokenAlias: { stable: false }
        }
        pagination: $pagination
        sort: $sort
      ) {
        sum
        date
      }
      stableCoins: tokenMetricChart(
        metric: usd
        group: $group
        filter: {
          dateAfter: $dateAfter
          dateBefore: $dateBefore
          tokenAlias: { stable: true }
        }
        pagination: $pagination
        sort: $sort
      ) {
        sum
        date
      }
    }
  }
`
