import { gql } from '@urql/core'

// $metric: MetricColumnType!
//     $metricGroup: MetricGroupEnum!
//     $metricFilter: ProtocolMetricChartFilterInputType
//     $metricSort: [ProtocolMetricChartSortInputType!]
//     $metricPagination: ProtocolMetricChartPaginationInputType

// metricChart(
//   metric: $metric
//   group: $metricGroup
//   filter: $metricFilter
//   sort: $metricSort
//   pagination: $metricPagination
// )

export const PROTOCOL_METRIC_CHART = gql`
  fragment protocolMetricChart on MetricChartType {
    date
    min
    max
    avg
    sum
    count
  }
`
