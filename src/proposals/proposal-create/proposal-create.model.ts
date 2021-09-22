import { createDomain, guard, sample } from 'effector-logger/macro'
import omit from 'lodash.omit'

import { history } from '~/common/history'
import { ProposalCreateInputType } from '~/graphql/_generated-types'
import { paths } from '~/paths'
import { proposalApi } from '~/proposals/common'

const proposalCreateDomain = createDomain('proposalCreate')

export const createProposalFx = proposalCreateDomain.createEffect({
  name: 'createProposalFx',
  handler: (input: ProposalCreateInputType) =>
    proposalApi.proposalCreate({ input }),
})

const redirectFx = proposalCreateDomain.createEffect({
  name: 'redirectFx',
  handler: (proposalId: string) =>
    history.push(paths.proposals.detail(proposalId)),
})

guard({
  clock: createProposalFx.doneData,
  filter: (proposalId?: string): proposalId is string => Boolean(proposalId),
  target: redirectFx,
})

export const createProposal = proposalCreateDomain.createEvent<
  ProposalCreateInputType & { status?: string }
>('createProposal')

sample({
  clock: createProposal,
  fn: (input) => omit(input, 'status'),
  target: createProposalFx,
})
