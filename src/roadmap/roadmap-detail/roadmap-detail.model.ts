import { createDomain, sample } from 'effector'
import { createGate } from 'effector-react'

import { Unwrap } from '~/common/types'
import { roadmapApi } from '~/roadmap/common'

const proposalDetailDomain = createDomain()

export const fetchProposalFx = proposalDetailDomain.createEffect(
  (proposalId: string) =>
    roadmapApi.proposalDetail({
      filter: {
        id: proposalId,
      },
    })
)

const ERROR_MESSAGE = "can't vote"

export const voteProposalFx = proposalDetailDomain.createEffect(
  async (proposalId: string) => {
    const data = await roadmapApi.vote(proposalId)

    if (!data) throw new Error(ERROR_MESSAGE)

    return {
      proposalId,
      data,
    }
  }
)

export const unvoteProposalFx = proposalDetailDomain.createEffect(
  async (params: { proposalId: string; userId?: string }) => {
    const data = await roadmapApi.proposalUnvote(params.proposalId)

    if (!data) {
      throw new Error(ERROR_MESSAGE)
    }
  }
)

export const $proposalDetail = proposalDetailDomain
  .createStore<Unwrap<ReturnType<typeof roadmapApi.proposalDetail>>>(null)
  .on(fetchProposalFx.doneData, (_, payload) => payload)
  .on(voteProposalFx.doneData, (state, payload) =>
    state
      ? {
          ...state,
          votes: {
            list: [...(state.votes.list ?? []), payload.data],
          },
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
            ),
          },
        }
      : state
  )

export const ProposalDetailGate = createGate<string>({
  name: 'ProposalDetailGate',
  domain: proposalDetailDomain,
})

$proposalDetail.reset(ProposalDetailGate.close)

sample({
  clock: ProposalDetailGate.open,
  target: fetchProposalFx,
})
