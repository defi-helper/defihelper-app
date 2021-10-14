import { useGate, useStore } from 'effector-react'
import { useParams } from 'react-router-dom'

import { AppLayout } from '~/layouts'
import { Typography } from '~/common/typography'
import { cutAccount } from '~/common/cut-account'
import { MarkdownRender } from '~/common/markdown-render'
import { userModel } from '~/users'
import { RoadmapVote } from '~/roadmap/common'
import { Link } from '~/common/link'
import { Paper } from '~/common/paper'
import { buildExplorerUrl } from '~/common/build-explorer-url'
import * as model from './roadmap-detail.model'
import { Head } from '~/common/head'

export type RoadmapDetailProps = unknown

export const RoadmapDetail: React.VFC<RoadmapDetailProps> = () => {
  const params = useParams<{ proposalId: string }>()

  useGate(model.ProposalDetailGate, params.proposalId)

  const proposal = useStore(model.$proposalDetail)
  const loading = useStore(model.fetchProposalFx.pending)
  const user = useStore(userModel.$user)

  const voted = proposal?.votes.list?.some(
    (votes) => votes.user.id === user?.id
  )

  const handleVote = (proposalId: string) => () => {
    model.voteProposalFx(proposalId)
  }
  const handleUnvote = (proposalId: string) => () => {
    model.unvoteProposalFx({
      proposalId,
      userId: user?.id,
    })
  }

  return (
    <AppLayout>
      <Head title={loading ? 'loading...' : proposal?.title} />
      <Paper radius={8}>
        {!loading && proposal && (
          <div>
            <RoadmapVote
              onUnvote={handleUnvote(proposal.id)}
              onVote={handleVote(proposal.id)}
              voted={voted}
            >
              {proposal?.votes.list?.length}
            </RoadmapVote>
            <Typography>{proposal?.title}</Typography>
            <MarkdownRender>{proposal?.description}</MarkdownRender>
          </div>
        )}
        {loading && 'loading...'}
        {!loading && !proposal && 'not found'}
      </Paper>
      {!loading && proposal && (
        <Paper radius={8}>
          {proposal.votes.list && (
            <div>
              {proposal.votes.list?.map((vote) => (
                <div key={vote.id}>
                  {vote.user.wallets.list?.map(({ address, network }) => (
                    <div key={`${address}-${network}`}>
                      <Link
                        href={buildExplorerUrl({ network, address })}
                        target="_blank"
                      >
                        {cutAccount(address)}
                      </Link>
                    </div>
                  ))}
                  {proposal.author?.id === vote.user.id && (
                    <div>creator of this proposal</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Paper>
      )}
    </AppLayout>
  )
}
