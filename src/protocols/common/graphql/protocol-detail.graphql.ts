import { gql } from '@urql/core'

import { PROTOCOL_METRIC_CHART } from './protocol-metric-chart.fragment.graphql'
import { PROTOCOL_FRAGMENT } from './protocol.fragment.graphql'

export const PROTOCOL_DETAIL = gql`
  query Protocol(
    $filter: ProtocolFilterInputType!
    $metric: MetricColumnType!
    $metricGroup: MetricGroupEnum!
    $metricFilter: ProtocolMetricChartFilterInputType
    $metricSort: [ProtocolMetricChartSortInputType!]
    $metricPagination: ProtocolMetricChartPaginationInputType
  ) {
    protocol(filter: $filter) {
      ...protocolFragment
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
  ${PROTOCOL_FRAGMENT}
  ${PROTOCOL_METRIC_CHART}
`
