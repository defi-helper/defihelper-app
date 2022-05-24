import clsx from 'clsx'
import React from 'react'
import { useGate, useStore } from 'effector-react'
import { useParams } from 'react-router-dom'

import { AppLayout } from '~/layouts'
import { Typography } from '~/common/typography'
import { MarkdownRender } from '~/common/markdown-render'
import { cutAccount } from '~/common/cut-account'
import { Link } from '~/common/link'
import { buildExplorerUrl } from '~/common/build-explorer-url'
import { config } from '~/config'
import {
  GovProposalStateEnum,
  GovReceiptSupportEnum,
} from '~/api/_generated-types'
import { dateUtils } from '~/common/date-utils'
import {
  GovernanceReasonDialog,
  GovernanceVoteInfo,
  GovProposalStateEnumColors,
} from '~/governance/common'
import { bignumberUtils } from '~/common/bignumber-utils'
import { Button } from '~/common/button'
import { isEthAddress } from '~/common/is-eth-address'
import { Chip } from '~/common/chip'
import { Paper } from '~/common/paper'
import { useDialog } from '~/common/dialog'
import { Head } from '~/common/head'
import { switchNetwork } from '~/wallets/common'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { WalletConnect } from '~/wallets/wallet-connect'
import { Loader } from '~/common/loader'
import * as model from './governance-detail.model'
import * as styles from './governance-detail.css'

export type GovernanceDetailProps = unknown

const QUORUM_VOTES = '400000'

export const GovernanceDetail: React.VFC<GovernanceDetailProps> = () => {
  const params = useParams<{ governanceId: string }>()

  const [openGovernanceReasonDialog] = useDialog(GovernanceReasonDialog)

  const loading = useStore(model.fetchGovernanceProposalFx.pending)
  const governanceDetail = useStore(model.$governanceDetail)
  const receipt = useStore(model.$receipt)

  useGate(model.GovernanceDetailGate, params.governanceId)

  const loadingQueue = useStore(model.queueFx.pending)
  const loadingExecute = useStore(model.executeFx.pending)

  const wallet = walletNetworkModel.useWalletNetwork()

  const handleQueueProposal = async () => {
    try {
      await switchNetwork(String(config.DEFAULT_CHAIN_ID))

      if (!wallet?.account) return

      model.queueFx({
        governanceId: Number(params.governanceId),
        account: wallet.account,
        chainId: String(wallet.chainId),
        provider: wallet.provider,
        cache: false,
      })
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }
  const handleExecuteProposal = async () => {
    try {
      await switchNetwork(String(config.DEFAULT_CHAIN_ID))

      if (!wallet?.account) return

      model.executeFx({
        governanceId: Number(params.governanceId),
        account: wallet.account,
        chainId: String(wallet.chainId),
        provider: wallet.provider,
        cache: false,
      })
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  const loadingCastVote = useStore(model.castVoteFx.pending)

  const handleVoteFor = async () => {
    try {
      await switchNetwork(String(config.DEFAULT_CHAIN_ID))

      if (!wallet?.account) return

      model.castVoteFx({
        proposalId: Number(params.governanceId),
        support: model.CastVotes.for,
        account: wallet.account,
        chainId: String(wallet.chainId),
        provider: wallet.provider,
        cache: false,
      })
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }
  const handleVoteAbstain = async () => {
    try {
      await switchNetwork(String(config.DEFAULT_CHAIN_ID))

      if (!wallet?.account) return

      const reason = await openGovernanceReasonDialog()

      model.castVoteFx({
        proposalId: Number(params.governanceId),
        support: model.CastVotes.abstain,
        reason,
        account: wallet.account,
        chainId: String(wallet.chainId),
        provider: wallet.provider,
        cache: false,
      })
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }
  const handleVoteAgainst = async () => {
    try {
      await switchNetwork(String(config.DEFAULT_CHAIN_ID))

      if (!wallet?.account) return

      model.castVoteFx({
        proposalId: Number(params.governanceId),
        support: model.CastVotes.against,
        account: wallet.account,
        chainId: String(wallet.chainId),
        provider: wallet.provider,
        cache: false,
      })
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  return (
    <AppLayout title={loading ? 'loading...' : governanceDetail?.title}>
      <Head title={loading ? 'loading...' : governanceDetail?.title} />
      {loading && (
        <div className={styles.loader}>
          <Loader height="36" />
        </div>
      )}
      {governanceDetail && (
        <div className={styles.root}>
          <Typography
            align="center"
            variant="h2"
            family="mono"
            transform="uppercase"
          >
            {governanceDetail.title}
          </Typography>
          <Chip
            color={GovProposalStateEnumColors[governanceDetail.state]}
            className={clsx(styles.status, styles.mb32)}
          >
            {governanceDetail.state}
          </Chip>
          {([
            GovProposalStateEnum.Defeated,
            GovProposalStateEnum.Executed,
            GovProposalStateEnum.Expired,
            GovProposalStateEnum.Succeeded,
          ].includes(governanceDetail.state) ||
            (receipt &&
              [
                GovReceiptSupportEnum.For,
                GovReceiptSupportEnum.Abstain,
                GovReceiptSupportEnum.Against,
              ].includes(receipt.support))) && (
            <div className={clsx(styles.voteInfo, styles.mb32)}>
              <GovernanceVoteInfo
                variant="for"
                active={receipt?.support === GovReceiptSupportEnum.For}
                total={bignumberUtils.total(
                  governanceDetail.abstainVotes,
                  governanceDetail.againstVotes,
                  governanceDetail.forVotes
                )}
                count={governanceDetail.forVotes}
              />
              <GovernanceVoteInfo
                variant="abstain"
                active={receipt?.support === GovReceiptSupportEnum.Abstain}
                total={bignumberUtils.total(
                  governanceDetail.abstainVotes,
                  governanceDetail.againstVotes,
                  governanceDetail.forVotes
                )}
                count={governanceDetail.abstainVotes}
              />
              <GovernanceVoteInfo
                variant="against"
                active={receipt?.support === GovReceiptSupportEnum.Against}
                total={bignumberUtils.total(
                  governanceDetail.abstainVotes,
                  governanceDetail.againstVotes,
                  governanceDetail.forVotes
                )}
                count={governanceDetail.againstVotes}
              />
            </div>
          )}
          {!bignumberUtils.gte(governanceDetail.forVotes, QUORUM_VOTES) && (
            <Typography
              variant="body1"
              align="center"
              as="div"
              className={styles.mb32}
            >
              In order to be applied, the quorum of 4% must be reached
            </Typography>
          )}
          {governanceDetail.state === GovProposalStateEnum.Active &&
            !receipt?.hasVoted && (
              <div className={clsx(styles.voteButtons, styles.mb32)}>
                <WalletConnect
                  fallback={
                    <Button className={styles.voteButton} color="green">
                      Vote for
                    </Button>
                  }
                  blockchain="ethereum"
                  network={config.DEFAULT_CHAIN_ID}
                >
                  <Button
                    className={styles.voteButton}
                    onClick={handleVoteFor}
                    loading={loadingCastVote}
                    color="green"
                  >
                    Vote for
                  </Button>
                </WalletConnect>
                <WalletConnect
                  fallback={
                    <Button className={styles.voteButton}>Vote abstain</Button>
                  }
                  blockchain="ethereum"
                  network={config.DEFAULT_CHAIN_ID}
                >
                  <Button
                    className={styles.voteButton}
                    onClick={handleVoteAbstain}
                    loading={loadingCastVote}
                  >
                    Vote abstain
                  </Button>
                </WalletConnect>
                <WalletConnect
                  fallback={
                    <Button className={styles.voteButton} color="red">
                      Vote against
                    </Button>
                  }
                  blockchain="ethereum"
                  network={config.DEFAULT_CHAIN_ID}
                >
                  <Button
                    className={styles.voteButton}
                    onClick={handleVoteAgainst}
                    loading={loadingCastVote}
                    color="red"
                  >
                    Vote against
                  </Button>
                </WalletConnect>
              </div>
            )}
          {governanceDetail.state === GovProposalStateEnum.Succeeded && (
            <WalletConnect
              fallback={<Button className={styles.mb32}>Connect</Button>}
              blockchain="ethereum"
              network={config.DEFAULT_CHAIN_ID}
            >
              <Button
                onClick={handleQueueProposal}
                loading={loadingQueue}
                className={styles.mb32}
              >
                Queue
              </Button>
            </WalletConnect>
          )}
          {dateUtils.after(
            dateUtils.now(),
            dateUtils.formatUnix(governanceDetail.eta, 'YYYY-MM-DD HH:mm:ss')
          ) &&
            governanceDetail.state === GovProposalStateEnum.Queued && (
              <WalletConnect
                fallback={<Button className={styles.mb32}>Connect</Button>}
                blockchain="ethereum"
                network={config.DEFAULT_CHAIN_ID}
              >
                <Button
                  onClick={handleExecuteProposal}
                  loading={loadingExecute}
                  className={styles.mb32}
                >
                  Execute
                </Button>
              </WalletConnect>
            )}
          {governanceDetail.state === GovProposalStateEnum.Active && (
            <Typography align="center" className={styles.mb32}>
              Voting will end on{' '}
              {dateUtils.format(
                governanceDetail.endVoteDate,
                'HH:mm on MMMM DD, YYYY'
              )}
            </Typography>
          )}
          {governanceDetail.state === GovProposalStateEnum.Queued && (
            <Typography align="center" className={styles.mb32}>
              Can be executed on{' '}
              {dateUtils.formatUnix(
                governanceDetail.eta,
                'HH:mm on MMMM DD, YYYY'
              )}
            </Typography>
          )}
          <Paper className={clsx(styles.actions, styles.mb32)}>
            {governanceDetail.actions.map(
              ({ target, callDatas, signature, id }) => (
                <Typography key={id} className={styles.action} as="div">
                  <Link
                    href={buildExplorerUrl({
                      network: config.DEFAULT_CHAIN_ID,
                      address: target,
                    })}
                    target="_blank"
                  >
                    {cutAccount(target)}
                  </Link>
                  .{signature}(
                  {callDatas.map((callData, index) => (
                    <React.Fragment key={String(index)}>
                      {isEthAddress(callData) ? (
                        <Link
                          href={buildExplorerUrl({
                            network: config.DEFAULT_CHAIN_ID,
                            address: callData,
                          })}
                          target="_blank"
                        >
                          {cutAccount(callData)}
                        </Link>
                      ) : (
                        callData
                      )}
                      {callDatas.length - 1 === index ? '' : ', '}
                    </React.Fragment>
                  ))}
                  )
                </Typography>
              )
            )}
          </Paper>
          <Typography>
            Author:{' '}
            <Link
              href={buildExplorerUrl({
                network: config.DEFAULT_CHAIN_ID,
                address: governanceDetail.proposer,
              })}
              target="_blank"
            >
              {cutAccount(governanceDetail.proposer)}
            </Link>
          </Typography>
          <MarkdownRender>{governanceDetail.description}</MarkdownRender>
        </div>
      )}
    </AppLayout>
  )
}
