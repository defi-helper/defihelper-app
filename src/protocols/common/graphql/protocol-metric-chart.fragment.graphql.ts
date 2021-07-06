import { gql } from '@urql/core'

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
