import { useGate, useStore } from 'effector-react'
import { Link as ReactRouterLink } from 'react-router-dom'

import { AppLayout } from '~/layouts'
import { Head } from '~/common/head'
import { paths } from '~/paths'
import { Chip } from '~/common/chip'
import { ButtonBase } from '~/common/button-base'
import { Button } from '~/common/button'
import { Typography } from '~/common/typography'
import {
  GovernanceDelegateDialog,
  GovProposalStateEnumColors,
} from '~/governance/common'
import { useDialog } from '~/common/dialog'
import { bignumberUtils } from '~/common/bignumber-utils'
import { Paper } from '~/common/paper'
import { Icon } from '~/common/icon'
import { switchNetwork } from '~/wallets/common'
import { config } from '~/config'
import { WalletConnect } from '~/wallets/wallet-connect'
import { Loader } from '~/common/loader'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import * as model from './governance-list.model'
import * as styles from './governance-list.css'
import { CanDemo } from '~/auth/can-demo'
import { GovernanceTokensRequired } from '../common/governance-tokens-required'

export type GovernanceListProps = unknown

const DELEGATE_TO_DEFAULT = '0x0000000000000000000000000000000000000000'

const getDelegateButtonText = (votes?: string | null, delegateTo?: string) => {
  if (bignumberUtils.gt(votes, 0)) {
    if (DELEGATE_TO_DEFAULT === delegateTo) {
      return 'Delegate'
    }

    return 'Redelegate'
  }

  return 'Unlock'
}

export const GovernanceList: React.VFC<GovernanceListProps> = () => {
  const [openDelegate] = useDialog(GovernanceDelegateDialog)
  const [openGovernanceTokensWarningDialog] = useDialog(
    GovernanceTokensRequired
  )

  const loading = useStore(model.fetchGovernanceListFx.pending)
  const governanceList = useStore(model.$governanceList)

  const governanceVotes = useStore(model.$governanceVotes)
  const votesLoading = useStore(model.fetchGovernanceVotesFx.pending)

  const delegateLoading = useStore(model.delegateVotesFx.pending)

  const isEnoughGovernanceTokens = bignumberUtils.gte(
    governanceVotes?.balance,
    10000000
  )

  const wallet = walletNetworkModel.useWalletNetwork()

  useGate(model.GovernanceListGate)

  const handleopenDelegate = async () => {
    try {
      await switchNetwork(String(config.DEFAULT_CHAIN_ID))

      if (!wallet?.account) return

      if (
        bignumberUtils.eq(governanceVotes?.votes, 0) &&
        bignumberUtils.eq(governanceVotes?.balance, 0)
      )
        return

      const result = await openDelegate({
        votes: governanceVotes?.votes,
        account: wallet.account,
      })

      model.delegateVotesFx({
        delegateAccount: result,
        account: wallet.account,
        chainId: String(wallet.chainId),
        provider: wallet.provider,
      })
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  return (
    <AppLayout
      title={
        <div className={styles.mobileTabs}>
          <Typography
            variant="inherit"
            as={ReactRouterLink}
            to={paths.roadmap.list}
            className={styles.inacitveTab}
          >
            Vote
          </Typography>
          <div>Governance</div>
        </div>
      }
    >
      <Head title="Governance" />
      <div className={styles.root}>
        <div className={styles.header}>
          <Typography
            variant="h3"
            as={ReactRouterLink}
            to={paths.roadmap.list}
            className={styles.inacitveTab}
          >
            Vote
          </Typography>
          <Typography variant="h3">Governance</Typography>
          <Paper radius={8} className={styles.votes}>
            <Typography variant="body2" as="span">
              {votesLoading ? (
                '...'
              ) : (
                <>
                  {bignumberUtils.gt(governanceVotes?.votes, 0)
                    ? governanceVotes?.votes ?? 0
                    : governanceVotes?.balance ?? 0}
                </>
              )}{' '}
              votes
              {bignumberUtils.gte(governanceVotes?.balance, '0') &&
                bignumberUtils.eq(governanceVotes?.votes, '0') &&
                ' (locked)'}
            </Typography>
            <WalletConnect
              fallback={
                <ButtonBase className={styles.delegate}>Connect</ButtonBase>
              }
              blockchain="ethereum"
              network={config.DEFAULT_CHAIN_ID}
            >
              <CanDemo>
                <ButtonBase
                  onClick={handleopenDelegate}
                  disabled={delegateLoading}
                  className={styles.delegate}
                >
                  {getDelegateButtonText(
                    governanceVotes?.votes,
                    governanceVotes?.delegates
                  )}
                </ButtonBase>
              </CanDemo>
            </WalletConnect>
          </Paper>
          <WalletConnect
            fallback={
              <Button variant="contained" color="blue">
                + New proposal
              </Button>
            }
            blockchain="ethereum"
            network={config.DEFAULT_CHAIN_ID}
          >
            {isEnoughGovernanceTokens ? (
              <Button
                as={ReactRouterLink}
                variant="contained"
                color="blue"
                to={paths.governance.create}
              >
                + New proposal
              </Button>
            ) : (
              <Button
                variant="contained"
                color="blue"
                onClick={() =>
                  openGovernanceTokensWarningDialog().catch(() => {})
                }
              >
                + New proposal
              </Button>
            )}
          </WalletConnect>
        </div>
        <Typography variant="h4" className={styles.subtitle}>
          Governance — it is the main tool for protocol management, control of
          the treasure and allocation of tokens
        </Typography>
        {loading && (
          <div className={styles.loader}>
            <Loader height="36" />
          </div>
        )}
        {!loading && !governanceList.length && (
          <Paper className={styles.proposal} radius={8}>
            No proposals yet...
          </Paper>
        )}
        {!loading &&
          Boolean(governanceList.length) &&
          governanceList.map((governanceProposal) => (
            <Paper
              as={ReactRouterLink}
              to={paths.governance.detail(String(governanceProposal.id))}
              key={governanceProposal.id}
              className={styles.proposal}
              radius={8}
            >
              <Typography variant="body2" as="span">
                {governanceProposal.title}
              </Typography>
              <Chip
                color={GovProposalStateEnumColors[governanceProposal.state]}
                className={styles.status}
              >
                {governanceProposal.state}
              </Chip>
              <ButtonBase className={styles.dotsButton}>
                <Icon icon="dots" width="16" height="16" />
              </ButtonBase>
            </Paper>
          ))}
        <model.GovernanceListPagination />
      </div>
    </AppLayout>
  )
}
