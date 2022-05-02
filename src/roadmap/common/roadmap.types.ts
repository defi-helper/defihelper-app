import { Unwrap } from '~/common/types'
import { ProposalFragmentFragment } from '~/api/_generated-types'
import { roadmapApi } from './roadmap.api'

export type Proposal = ProposalFragmentFragment & {
  deleting?: boolean
  updating?: boolean
}

export type ProposalsByStatus = Unwrap<
  ReturnType<typeof roadmapApi.proposalListByStatus>
>
