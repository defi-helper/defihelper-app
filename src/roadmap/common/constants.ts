import { ProposalStatusEnum, ProposalTagEnum } from '~/graphql/_generated-types'

export const STATUSES = {
  [ProposalStatusEnum.Open]: 'Planned',
  [ProposalStatusEnum.Executed]: 'Released',
  [ProposalStatusEnum.Defeated]: 'Defeated',
  [ProposalStatusEnum.InProcess]: 'In progress',
} as const

export const TAGS: Record<string, string> = {
  [ProposalTagEnum.BlockchainRequest]: 'Blockchain request',
  [ProposalTagEnum.BugReport]: 'Bug report',
  [ProposalTagEnum.FeatureRequest]: 'Feature request',
  [ProposalTagEnum.ProtocolRequest]: 'Protocol request',
  [ProposalTagEnum.TokenRequest]: 'Token request',
}
