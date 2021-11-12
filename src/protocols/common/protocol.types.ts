import {
  MetricChartType,
  MetricGroupEnum,
  ProtocolFragmentFragment,
} from '~/graphql/_generated-types'

export type Protocol = ProtocolFragmentFragment & {
  deleting: boolean
  type: 'Protocol'
  metricChart: Pick<MetricChartType, 'avg'>[]
}

export enum Tabs {
  Favourite,
  All,
}

export const MetricGroups: Record<string, string> = {
  [MetricGroupEnum.Day]: 'daily',
  [MetricGroupEnum.Week]: 'weekly',
  [MetricGroupEnum.Year]: 'yearly',
}

export const isMetricGroup = (
  group: string
): group is Exclude<MetricGroupEnum, MetricGroupEnum.Hour> => {
  const arr: string[] = [
    MetricGroupEnum.Day,
    MetricGroupEnum.Week,
    MetricGroupEnum.Year,
  ]

  return arr.includes(group)
}

export type StakedBalance = {
  date: string
  altCoin: string
  stableCoin: string
}

export type EastimatedEarnings = {
  hold: string
  autostaking: string
  date: number
}

export type State<T> = Record<
  Exclude<MetricGroupEnum, MetricGroupEnum.Hour>,
  {
    data: T
    value: Exclude<MetricGroupEnum, MetricGroupEnum.Hour>
    loading: boolean
  }
>
