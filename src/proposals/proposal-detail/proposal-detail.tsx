import { Link, Paper } from '@material-ui/core'
import { useGate, useStore } from 'effector-react'
import { useParams } from 'react-router-dom'

import { AppLayout } from '~/layouts'
import { Typography } from '~/common/typography'
import { cutAccount } from '~/common/cut-account'
import { MarkdownRender } from '~/common/markdown-render'
import { userModel } from '~/users'
import { ProposalVote } from '~/proposals/common'
import * as model from './proposal-detail.model'
import { buildExplorerUrl } from '~/common/build-explorer-url'

export type ProposalDetailProps = unknown

export const ProposalDetail: React.VFC<ProposalDetailProps> = () => {
  const params = useParams<{ proposalId: string }>()

  useGate(model.Gate, params.proposalId)

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
      <Paper>
        {!loading && proposal && (
          <div>
            <ProposalVote
              onUnvote={handleUnvote(proposal.id)}
              onVote={handleVote(proposal.id)}
              voted={voted}
            >
              {proposal?.votes.list?.length}
            </ProposalVote>
            <Typography>{proposal?.title}</Typography>
            <MarkdownRender>{proposal?.description}</MarkdownRender>
          </div>
        )}
        {loading && 'loading...'}
        {!loading && !proposal && 'not found'}
      </Paper>
      {!loading && proposal && (
        <Paper>
          {proposal.votes.list && (
            <div>
              {proposal.votes.list?.map((vote) => (
                <div key={vote.id}>
                  {vote.user.wallets.list?.map(({ address, network }) => (
                    <Link
                      key={address}
                      href={buildExplorerUrl({ network, address })}
                      target="_blank"
                    >
                      {cutAccount(address)}
                    </Link>
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
