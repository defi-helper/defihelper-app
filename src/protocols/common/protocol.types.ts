import { ProtocolFragmentFragment } from '~/api/_generated-types'

export type Protocol = ProtocolFragmentFragment & {
  deleting: boolean
  type: 'Protocol'
}

export enum Tabs {
  Favorite = 'favorite',
  All = 'all',
  FullSupport = 'full-support',
}

export type EastimatedEarnings = {
  hold: string
  autostaking: string
  date: number
}

export type State<T> = Record<
  string,
  {
    data: T
    value: string
    loading: boolean
  }
>
