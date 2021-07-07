import { gql } from '@urql/core'

import { PROTOCOL_METRIC_CHART } from './protocol-metric-chart.fragment.graphql'

export const PROTOCOL_DETAIL_METRIC = gql`
  query ProtocolMetric(
    $filter: ProtocolFilterInputType!
    $metric: MetricColumnType!
    $metricGroup: MetricGroupEnum!
    $metricFilter: ProtocolMetricChartFilterInputType
    $metricSort: [ProtocolMetricChartSortInputType!]
    $metricPagination: ProtocolMetricChartPaginationInputType
  ) {
    protocol(filter: $filter) {
      metricChart(
        metric: $metric
        group: $metricGroup
        filter: $metricFilter
        sort: $metricSort
        pagination: $metricPagination
      ) {
        ...protocolMetricChart
      }
    }
  }
  ${PROTOCOL_METRIC_CHART}
`
