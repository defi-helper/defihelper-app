import { ProtocolFragmentFragment } from '~/api/_generated-types'

export type Protocol = ProtocolFragmentFragment & {
  deleting: boolean
  type: 'Protocol'
}

export enum Tabs {
  Favourite,
  All,
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
