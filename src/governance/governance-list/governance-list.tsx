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

  const loading = useStore(model.fetchGovernanceListFx.pending)
  const governanceList = useStore(model.$governanceList)

  const governanceVotes = useStore(model.$governanceVotes)
  const votesLoading = useStore(model.fetchGovernanceVotesFx.pending)

  const delegateLoading = useStore(model.delegateVotesFx.pending)

  const wallet = walletNetworkModel.useWalletNetwork()

  useGate(model.GovernanceListGate)

  const handleopenDelegate = async () => {
    try {
      await switchNetwork(String(config.DEFAULT_CHAIN_ID))

      if (!wallet?.account) return

      if (bignumberUtils.eq(governanceVotes?.votes, 0)) return

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
    <AppLayout>
      <Head title="Governance" />
      <div className={styles.root}>
        <div className={styles.header}>
          <Typography variant="h3" family="square">
            Governance
          </Typography>
          <Paper radius={8} className={styles.votes}>
            <Typography variant="body2" as="span">
              {votesLoading ? '...' : governanceVotes?.votes ?? 0} votes
              (locked)
            </Typography>
            <WalletConnect
              fallback={
                <ButtonBase className={styles.delegate}>Connect</ButtonBase>
              }
              blockchain="ethereum"
              network="1"
            >
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
            </WalletConnect>
          </Paper>
          <WalletConnect
            fallback={
              <Button variant="contained" color="blue">
                <Icon icon="plus" height="24" width="24" />
              </Button>
            }
            blockchain="ethereum"
            network="1"
          >
            <Button
              as={ReactRouterLink}
              variant="contained"
              color="blue"
              to={paths.governance.create}
            >
              <Icon icon="plus" height="24" width="24" />
            </Button>
          </WalletConnect>
        </div>
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
