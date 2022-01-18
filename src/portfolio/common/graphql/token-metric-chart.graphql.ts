import { gql } from 'urql'

export const TOKEN_METRIC_CHART = gql`
  query TokenMetricChart(
    $group: MetricGroupEnum!
    $dateAfter: DateTimeType
    $dateBefore: DateTimeType
    $pagination: UserTokenMetricChartPaginationInputType
    $sort: [UserTokenMetricChartSortInputType!]
  ) {
    me {
      altCoin: tokenMetricChart(
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
      stableCoin: tokenMetricChart(
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
