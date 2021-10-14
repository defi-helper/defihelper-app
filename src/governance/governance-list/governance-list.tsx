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
import { useWalletList } from '~/wallets/wallet-list'
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
  const [openWalletList] = useWalletList()

  const loading = useStore(model.fetchGovernanceListFx.pending)
  const governanceList = useStore(model.$governanceList)

  const governanceVotes = useStore(model.$governanceVotes)
  const votesLoading = useStore(model.fetchGovernanceVotesFx.pending)

  const delegateLoading = useStore(model.delegateVotesFx.pending)

  useGate(model.GovernanceListGate)

  const handleopenDelegate = async () => {
    try {
      const wallet = await openWalletList()

      if (!wallet.account) return

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
          </Paper>
          <Button
            as={ReactRouterLink}
            variant="contained"
            color="blue"
            to={paths.governance.create}
          >
            <Icon icon="plus" height="24" width="24" />
          </Button>
        </div>
        {loading && 'loading...'}
        {!loading && !governanceList.length && 'No proposals yet...'}
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
