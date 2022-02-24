import { ProposalStatusEnum, ProposalTagEnum } from '~/graphql/_generated-types'

export const STATUSES = {
  [ProposalStatusEnum.Open]: 'Planned',
  [ProposalStatusEnum.Executed]: 'Released',
  [ProposalStatusEnum.Defeated]: 'Defeated',
  [ProposalStatusEnum.InProcess]: 'In progress',
} as const

export const TAGS: Record<string, string> = {
  [ProposalTagEnum.BlockchainRequest]: 'Token request',
  [ProposalTagEnum.BugReport]: 'Protocol request',
  [ProposalTagEnum.FeatureRequest]: 'Blockchain request',
  [ProposalTagEnum.ProtocolRequest]: 'Feature request',
  [ProposalTagEnum.TokenRequest]: 'Bug report',
}
