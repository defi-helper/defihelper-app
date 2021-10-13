import { ProposalStatusEnum } from '~/graphql/_generated-types'

export const STATUSES = {
  [ProposalStatusEnum.Open]: 'Planned',
  [ProposalStatusEnum.Executed]: 'Released',
  [ProposalStatusEnum.Defeated]: 'Defeated',
  [ProposalStatusEnum.InProcess]: 'In progress',
} as const
