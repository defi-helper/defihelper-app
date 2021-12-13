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
          tokenAlias: { liquidity: unstable }
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
          tokenAlias: { liquidity: stable }
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
