import { createDomain, sample, UnitValue } from 'effector'
import { createGate } from 'effector-react'

import { roadmapApi } from '~/roadmap/common'

const proposalDetailDomain = createDomain()

export const fetchProposalFx = proposalDetailDomain.createEffect(
  async (proposalId: string) => {
    const data = await roadmapApi.proposalDetail({
      filter: {
        id: proposalId,
      },
    })

    if (!data) throw new Error('not found')

    return data
  }
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
  .createStore<UnitValue<typeof fetchProposalFx.doneData> | null>(null)
  .on(fetchProposalFx.doneData, (_, payload) => payload)
  .on(voteProposalFx.doneData, (state, payload) => {
    return state
      ? {
          ...state,
          votes: {
            list: [...(state.votes.list ?? []), payload.data],
          },
        }
      : state
  })
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
