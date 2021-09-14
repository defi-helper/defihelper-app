import { createDomain, guard } from 'effector-logger/macro'

import { history } from '~/common/history'
import { ProposalUpdateMutationVariables } from '~/graphql/_generated-types'
import { paths } from '~/paths'
import { proposalApi } from '~/proposals/common'

const proposalUpdateDomain = createDomain('proposalUpdate')

export const updateProposalFx = proposalUpdateDomain.createEffect({
  name: 'updateProposalFx',
  handler: (variables: ProposalUpdateMutationVariables) =>
    proposalApi.proposalUpdate(variables),
})

const redirectFx = proposalUpdateDomain.createEffect({
  name: 'redirectFx',
  handler: (proposalId: string) =>
    history.push(paths.proposals.detail(proposalId)),
})

guard({
  clock: updateProposalFx.doneData,
  filter: (proposalId?: string): proposalId is string => Boolean(proposalId),
  target: redirectFx,
})
