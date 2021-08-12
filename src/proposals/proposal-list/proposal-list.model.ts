import { createDomain, sample } from 'effector-logger'
import { createGate } from 'effector-react'

import { createPagination, PaginationState } from '~/common/create-pagination'
import { ProposalFragmentFragment } from '~/graphql/_generated-types'
import { proposalApi } from '~/proposals/common'

const proposalListDomain = createDomain('proposalList')

export const fetchProposalListFx = proposalListDomain.createEffect({
  name: 'fetchProposalListFx',
  handler: (pagination: PaginationState) =>
    proposalApi.proposalList({
      pagination,
    }),
})

const ERROR = 'Not deleted'

export const deleteProposalFx = proposalListDomain.createEffect({
  name: 'deleteProposalFx',
  handler: async (proposalId: string) => {
    const isDeleted = await proposalApi.proposalDelete(proposalId)

    if (isDeleted) {
      return proposalId
    }

    throw new Error(ERROR)
  },
})

const ERROR_MESSAGE = "can't vote"

export const voteProposalFx = proposalListDomain.createEffect({
  name: 'voteProposalFx',
  handler: async (proposalId: string) => {
    const data = await proposalApi.proposalVote(proposalId)

    if (!data) throw new Error(ERROR_MESSAGE)

    return {
      proposalId,
      data,
    }
  },
})

export const unvoteProposalFx = proposalListDomain.createEffect({
  name: 'unvoteProposalFx',
  handler: async (params: { proposalId: string; userId?: string }) => {
    const data = await proposalApi.proposalUnvote(params.proposalId)

    if (!data) {
      throw new Error(ERROR_MESSAGE)
    }
  },
})

export const $proposalList = proposalListDomain
  .createStore<(ProposalFragmentFragment & { deleting: boolean })[]>([], {
    name: '$proposalList',
  })
  .on(fetchProposalListFx.doneData, (_, payload) =>
    payload.list.map((proposal) => ({ ...proposal, deleting: false }))
  )
  .on(deleteProposalFx, (state, payload) =>
    state.map((protocol) =>
      protocol.id === payload ? { ...protocol, deleting: true } : protocol
    )
  )
  .on(deleteProposalFx.doneData, (state, payload) =>
    state.filter(({ id }) => id !== payload)
  )
  .on(voteProposalFx.doneData, (state, payload) =>
    state.map((proposal) =>
      proposal.id === payload.proposalId
        ? {
            ...proposal,
            votes: {
              list: [...(proposal.votes.list ?? []), payload.data],
            },
          }
        : proposal
    )
  )
  .on(unvoteProposalFx.done, (state, { params }) =>
    state.map((proposal) =>
      proposal.id === params.proposalId
        ? {
            ...proposal,
            votes: {
              list: proposal.votes.list?.filter(
                (vote) => vote.user.id !== params.userId
              ),
            },
          }
        : proposal
    )
  )

export const ProposalListGate = createGate({
  domain: proposalListDomain,
})

export const ProposalListPagination = createPagination({
  domain: proposalListDomain,
})

sample({
  source: ProposalListPagination.state,
  clock: [ProposalListGate.open, ProposalListPagination.updates],
  target: fetchProposalListFx,
})

sample({
  source: fetchProposalListFx.doneData,
  fn: (source) => source.pagination,
  target: ProposalListPagination.totalElements,
})
