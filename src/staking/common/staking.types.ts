import { StakingAutomatesContractsQuery } from '~/graphql/_generated-types'

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
