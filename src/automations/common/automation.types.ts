import {
  AutomationTriggerFragmentFragment,
  WalletType,
  AutomationProtocolsQuery,
} from '~/graphql/_generated-types'

export type Trigger = AutomationTriggerFragmentFragment & { deleting?: boolean }

export type Automates = {
  protocol: string
  contract: string
  address?: string
  id?: string
}

export type AutomationNetwork = {
  title: string
  icon: 'ethereumRegular' | 'ethereumRegular' | 'bnbRegular' | 'wavesRegular'
}

export type Wallet = Pick<
  WalletType,
  | 'address'
  | 'id'
  | 'network'
  | 'createdAt'
  | 'blockchain'
  | 'publicKey'
  | 'name'
>

export type Protocol = Exclude<
  AutomationProtocolsQuery['protocols']['list'],
  null | undefined
>[number]

export type Contract = Exclude<
  Protocol['contracts']['list'],
  null | undefined
>[number]

export type FormItem = {
  title: string
  description: string
  component: JSX.Element
}
