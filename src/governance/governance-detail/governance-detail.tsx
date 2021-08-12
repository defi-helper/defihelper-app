import { useGate, useStore } from 'effector-react'
import { useParams } from 'react-router-dom'

import { AppLayout } from '~/layouts'
import { Typography } from '~/common/typography'
import { MarkdownRender } from '~/common/markdown-render'
import * as model from './governance-detail.model'
import { cutAccount } from '~/common/cut-account'
import { Link } from '~/common/link'
import { buildExplorerUrl } from '~/common/build-explorer-url'
import { config } from '~/config'
import { GovProposalStateEnum } from '~/graphql/_generated-types'
import { dateUtils } from '~/common/date-utils'
import { GovernanceVoteInfo } from '~/governance/common'
import { bignumberUtils } from '~/common/bignumber-utils'
import { Grid } from '~/common/grid'
import { Button } from '~/common/button'

export type GovernanceDetailProps = unknown

export const GovernanceDetail: React.VFC<GovernanceDetailProps> = () => {
  const params = useParams<{ governanceId: string }>()

  const loading = useStore(model.fetchGovernanceProposalFx.pending)
  const governanceDetail = useStore(model.$governanceDetail)

  useGate(model.GovernanceDetailGate, params.governanceId)

  const loadingQueue = useStore(model.queueFx.pending)
  const loadingExecute = useStore(model.executeFx.pending)

  const handleQueueProposal = () => {
    model.queueFx()
  }
  const handleExecuteProposal = () => {
    model.executeFx()
  }

  const loadingCastVote = useStore(model.castVoteFx.pending)

  const handleVoteFor = () => {
    model.castVoteFx()
  }
  const handleVoteAbstain = () => {
    model.castVoteFx()
  }
  const handleVoteAgainst = () => {
    model.castVoteFx()
  }

  return (
    <AppLayout>
      {loading && <Typography>loading...</Typography>}
      {governanceDetail && (
        <>
          <Typography>{governanceDetail.title}</Typography>
          {[
            GovProposalStateEnum.Defeated,
            GovProposalStateEnum.Executed,
            GovProposalStateEnum.Expired,
            GovProposalStateEnum.Succeeded,
          ].includes(governanceDetail.state) && (
            <Grid.Container variant="fluid">
              <Grid.Row>
                <GovernanceVoteInfo
                  variant="for"
                  active={false}
                  total={bignumberUtils.total(
                    governanceDetail.abstainVotes,
                    governanceDetail.againstVotes,
                    governanceDetail.forVotes
                  )}
                  count={governanceDetail.forVotes}
                />
                <GovernanceVoteInfo
                  variant="abstain"
                  active={false}
                  total={bignumberUtils.total(
                    governanceDetail.abstainVotes,
                    governanceDetail.againstVotes,
                    governanceDetail.forVotes
                  )}
                  count={governanceDetail.abstainVotes}
                />
                <GovernanceVoteInfo
                  variant="against"
                  active={false}
                  total={bignumberUtils.total(
                    governanceDetail.abstainVotes,
                    governanceDetail.againstVotes,
                    governanceDetail.forVotes
                  )}
                  count={governanceDetail.againstVotes}
                />
              </Grid.Row>
            </Grid.Container>
          )}
          {governanceDetail.state === GovProposalStateEnum.Succeeded && (
            <div>
              <Button onClick={handleVoteFor} loading={loadingCastVote}>
                Vote for
              </Button>
              <Button onClick={handleVoteAbstain} loading={loadingCastVote}>
                Vote abstain
              </Button>
              <Button onClick={handleVoteAgainst} loading={loadingCastVote}>
                Vote against
              </Button>
            </div>
          )}
          {GovProposalStateEnum.Succeeded === governanceDetail.state && (
            <Button onClick={handleQueueProposal} loading={loadingQueue}>
              Queue
            </Button>
          )}
          {dateUtils.after(
            dateUtils.now(),
            dateUtils.formatUnix(governanceDetail.eta, 'YYYY-MM-DD HH:mm:ss')
          ) &&
            GovProposalStateEnum.Queued === governanceDetail.state && (
              <Button onClick={handleExecuteProposal} loading={loadingExecute}>
                Execute
              </Button>
            )}
          <Typography>{governanceDetail.state}</Typography>
          {GovProposalStateEnum.Active === governanceDetail.state && (
            <span>
              Voting will end on{' '}
              {dateUtils.format(
                governanceDetail.endBlock,
                'DD MMMM YYYY HH:mm'
              )}
            </span>
          )}
          {GovProposalStateEnum.Queued === governanceDetail.state && (
            <span>
              Can be executed on{' '}
              {dateUtils.formatUnix(governanceDetail.eta, 'DD MMMM YYYY HH:mm')}
            </span>
          )}
          <div>
            {governanceDetail.actions.map(
              ({ target, callData, signature, id }) => (
                <div key={id}>
                  <Link
                    href={buildExplorerUrl({
                      network: config.IS_DEV ? '3' : '1',
                      address: governanceDetail.proposer,
                    })}
                    target="_blank"
                  >
                    {cutAccount(target)}
                  </Link>
                  .{signature}({callData})
                </div>
              )
            )}
          </div>
          <Typography>
            Proposer:{' '}
            <Link
              href={buildExplorerUrl({
                network: config.IS_DEV ? '3' : '1',
                address: governanceDetail.proposer,
              })}
              target="_blank"
            >
              {cutAccount(governanceDetail.proposer)}
            </Link>
          </Typography>
          <MarkdownRender>{governanceDetail.description}</MarkdownRender>
        </>
      )}
    </AppLayout>
  )
}
