import { gql } from '@urql/core'

import { PROTOCOL_METRIC_CHART } from './protocol-metric-chart.fragment.graphql'

export const PROTOCOL_DETAIL_METRIC = gql`
  query ProtocolMetric(
    $filter: ProtocolFilterInputType!
    $metric: MetricColumnType!
    $metricGroup: MetricGroupEnum!
    $metricFilter: ProtocolMetricChartContractsFilterInputType
    $metricSort: [ProtocolMetricChartContractsSortInputType!]
    $metricPagination: ProtocolMetricChartContractsPaginationInputType
  ) {
    protocol(filter: $filter) {
      metricChartContracts(
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
