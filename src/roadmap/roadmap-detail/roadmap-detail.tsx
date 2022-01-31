import { useGate, useStore } from 'effector-react'
import { useParams } from 'react-router-dom'

import { AppLayout } from '~/layouts'
import { authModel } from '~/auth'
import { RoadmapCard } from '~/roadmap/common'
import { Paper } from '~/common/paper'
import { Head } from '~/common/head'
import { Loader } from '~/common/loader'
import { Typography } from '~/common/typography'
import * as styles from './roadmap-detail.css'
import * as model from './roadmap-detail.model'

export type RoadmapDetailProps = unknown

export const RoadmapDetail: React.VFC<RoadmapDetailProps> = () => {
  const params = useParams<{ proposalId: string }>()

  useGate(model.ProposalDetailGate, params.proposalId)

  const proposal = useStore(model.$proposalDetail)
  const loading = useStore(model.fetchProposalFx.pending)
  const user = useStore(authModel.$user)

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
      <Typography variant="h3" className={styles.title}>
        Vote
      </Typography>
      <Paper radius={8}>
        {!loading && proposal && (
          <RoadmapCard
            {...proposal}
            onUnvote={handleUnvote(proposal.id)}
            onVote={handleVote(proposal.id)}
            voted={voted}
          />
        )}
        {loading && (
          <div className={styles.loader}>
            <Loader height="36" />
          </div>
        )}
        {!loading && !proposal && 'Not found'}
      </Paper>
    </AppLayout>
  )
}
