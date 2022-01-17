import { gql } from 'urql'

export const TOKEN_METRIC = gql`
  query TokenMetric(
    $group: MetricGroupEnum! = day
    $metricDateBefore: DateTimeType
    $metricDateAfter: DateTimeType
    $sort: [UserMetricChartSortInputType!] = [{ column: date, order: asc }]
    $pagination: UserMetricChartPaginationInputType = { limit: 1 }
    $balanceSort: [UserTokenMetricChartSortInputType!] = [
      { column: date, order: asc }
    ]
    $balancePagination: UserTokenMetricChartPaginationInputType = { limit: 1 }
  ) {
    me {
      stakingUSD: metricChart(
        metric: stakingUSD
        group: $group
        filter: { dateAfter: $metricDateAfter, dateBefore: $metricDateBefore }
        pagination: $pagination
        sort: $sort
      ) {
        date
        sum
      }
      earnedUSD: metricChart(
        metric: earnedUSD
        group: $group
        filter: { dateAfter: $metricDateAfter, dateBefore: $metricDateBefore }
        pagination: $pagination
        sort: $sort
      ) {
        date
        sum
      }
      balanceUSD: tokenMetricChart(
        metric: "usd"
        group: $group
        filter: {
          tokenAlias: { liquidity: [stable, unstable] }
          contract: []
          dateAfter: $metricDateAfter
          dateBefore: $metricDateBefore
        }
        pagination: $balancePagination
        sort: $balanceSort
      ) {
        date
        sum
      }
      onWallets: metricChart(
        metric: earnedUSD
        group: $group
        filter: { dateAfter: $metricDateAfter, dateBefore: $metricDateBefore }
        pagination: $pagination
        sort: $sort
      ) {
        date
        sum
      }
    }
  }
`
