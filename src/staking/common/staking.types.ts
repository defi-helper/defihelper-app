import {
  StakingAutomatesContractsQuery,
  ContractListSortInputTypeColumnEnum,
  MetricChartType,
  SortOrderEnum,
  StakingContractFragmentFragment,
} from '~/graphql/_generated-types'

export type StakingAutomatesContract = Exclude<
  Exclude<
    StakingAutomatesContractsQuery['automateContracts'],
    null | undefined
  >['list'],
  null | undefined
>[number] & {
  migrating?: boolean
  depositing?: boolean
  refunding?: boolean
  deleting?: boolean
  editing?: boolean
  running?: boolean
}

export type StakingListPayload = {
  protocolId: string
  protocolAdapter?: string | null
  hidden: null | boolean
  sortColumn?: ContractListSortInputTypeColumnEnum
  sortOrder?: SortOrderEnum
  search?: string
}

export type ConnectParams = {
  contract: string
  wallet: string
}

export type RegisterParams = {
  id: string
  events: string[]
}

export type Contract = StakingContractFragmentFragment & {
  type: 'Contract'
  autostakingLoading?: boolean
}

export type ContractMetric = {
  tvl: Array<Pick<MetricChartType, 'avg'>>
  apr: Array<Pick<MetricChartType, 'avg'>>
  stakingUSD: Array<Pick<MetricChartType, 'avg'>>
  earnedUSD: Array<Pick<MetricChartType, 'avg'>>
}

export type FreshMetrics = {
  contractId: string
  tvl: string
  aprYear: string
  myStaked: string
  myEarned: string
}
