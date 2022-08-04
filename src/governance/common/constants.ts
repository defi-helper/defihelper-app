import { GovProposalStateEnum } from '~/api/_generated-types'

export const GovProposalStateEnumColors = {
  [GovProposalStateEnum.Pending]: 'grey',
  [GovProposalStateEnum.Active]: 'blue',
  [GovProposalStateEnum.Defeated]: 'red',
  [GovProposalStateEnum.Canceled]: 'orange',
  [GovProposalStateEnum.Succeeded]: 'green',
  [GovProposalStateEnum.Queued]: 'purple',
  [GovProposalStateEnum.Executed]: 'green',
  [GovProposalStateEnum.Expired]: 'grey',
} as const
