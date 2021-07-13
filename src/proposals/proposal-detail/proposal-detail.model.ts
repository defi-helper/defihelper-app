import { createDomain, sample } from 'effector-logger'
import { createGate } from 'effector-react'

import { Unwrap } from '~/common/types'
import { proposalApi } from '~/proposals/common'

const proposalDetailDomain = createDomain('proposalDetail')

export const fetchProposalFx = proposalDetailDomain.createEffect({
  name: 'fetchProposalFx',
  handler: (proposalId: string) =>
    proposalApi.proposalDetail({
      filter: {
        id: proposalId
      }
    })
})

const ERROR_MESSAGE = "can't vote"

export const voteProposalFx = proposalDetailDomain.createEffect({
  name: 'voteProposalFx',
  handler: async (proposalId: string) => {
    const data = await proposalApi.proposalVote(proposalId)

    if (!data) throw new Error(ERROR_MESSAGE)

    return {
      proposalId,
      data
    }
  }
})

export const unvoteProposalFx = proposalDetailDomain.createEffect({
  name: 'unvoteProposalFx',
  handler: async (params: { proposalId: string; userId?: string }) => {
    const data = await proposalApi.proposalUnvote(params.proposalId)

    if (!data) {
      throw new Error(ERROR_MESSAGE)
    }
  }
})

export const $proposalDetail = proposalDetailDomain
  .createStore<Unwrap<ReturnType<typeof proposalApi.proposalDetail>>>(null, {
    name: '$proposalDetail'
  })
  .on(fetchProposalFx.doneData, (_, payload) => payload)
  .on(voteProposalFx.doneData, (state, payload) =>
    state
      ? {
          ...state,
          votes: {
            list: [...(state.votes.list ?? []), payload.data]
          }
        }
      : state
  )
  .on(unvoteProposalFx.done, (state, { params }) =>
    state
      ? {
          ...state,
          votes: {
            list: state.votes.list?.filter(
              (vote) => vote.user.id !== params.userId
            )
          }
        }
      : state
  )

export const Gate = createGate<string>({
  domain: proposalDetailDomain
})

sample({
  clock: Gate.open,
  target: fetchProposalFx
})
