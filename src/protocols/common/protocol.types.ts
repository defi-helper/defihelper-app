import {
  MetricGroupEnum,
  ProtocolFragmentFragment,
} from '~/graphql/_generated-types'

export type Protocol = ProtocolFragmentFragment & {
  deleting: boolean
  type: 'Protocol'
}

export enum Tabs {
  Favourite,
  All,
}

export const MetricGroups: Record<string, string> = {
  [MetricGroupEnum.Hour]: 'hourly',
  [MetricGroupEnum.Day]: 'daily',
  [MetricGroupEnum.Week]: 'weekly',
}

export const isMetricGroup = (
  group: string
): group is Exclude<MetricGroupEnum, MetricGroupEnum.Year> => {
  const arr: string[] = [
    MetricGroupEnum.Day,
    MetricGroupEnum.Week,
    MetricGroupEnum.Hour,
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
  Exclude<MetricGroupEnum, MetricGroupEnum.Year>,
  {
    data: T
    value: Exclude<MetricGroupEnum, MetricGroupEnum.Year>
    loading: boolean
  }
>
