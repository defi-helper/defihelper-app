import { AutostakingStakingContractsQuery } from '~/api'

export type InvestContract = Exclude<
  AutostakingStakingContractsQuery['contracts']['list'],
  null | undefined
>[number]
