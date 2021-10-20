import { gql } from '@urql/core'

export const STAKING_CONTRACT_METRIC = gql`
  query StakingContractMetric(
    $metricTvl: MetricColumnType! = tvl
    $metricApr: MetricColumnType! = aprDay
    $metricStakingUSD: MetricColumnType! = stakingUSD
    $metricEarnedUSD: MetricColumnType! = earnedUSD
    $metricGroup: MetricGroupEnum! = day
    $metricFilter: UserMetricChartFilterInputType
    $metricSort: [UserMetricChartSortInputType!] = [
      { column: date, order: asc }
    ]
    $metricPagination: UserMetricChartPaginationInputType = {
      limit: 1
      offset: 0
    }
  ) {
    me {
      tvl: metricChart(
        metric: $metricTvl
        group: $metricGroup
        filter: $metricFilter
        sort: $metricSort
        pagination: $metricPagination
      ) {
        avg
      }
      apr: metricChart(
        metric: $metricApr
        group: $metricGroup
        filter: $metricFilter
        sort: $metricSort
        pagination: $metricPagination
      ) {
        avg
      }
      stakingUSD: metricChart(
        metric: $metricStakingUSD
        group: $metricGroup
        filter: $metricFilter
        sort: $metricSort
        pagination: $metricPagination
      ) {
        avg
      }
      earnedUSD: metricChart(
        metric: $metricEarnedUSD
        group: $metricGroup
        filter: $metricFilter
        sort: $metricSort
        pagination: $metricPagination
      ) {
        avg
      }
    }
  }
`
