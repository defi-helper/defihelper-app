import {
  MetricChartType,
  ProtocolFragmentFragment,
} from '~/graphql/_generated-types'

export type Protocol = ProtocolFragmentFragment & {
  deleting: boolean
  type: 'Protocol'
  metricChart: Pick<MetricChartType, 'avg'>[]
}
