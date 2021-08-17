import { useGate, useStore } from 'effector-react'
import { Link as ReactRouterLink } from 'react-router-dom'

import { AppLayout } from '~/layouts'
import { Paper } from '~/common/paper'
import { paths } from '~/paths'
import { Chip } from '~/common/chip'
import { Button } from '~/common/button'
import { Typography } from '~/common/typography'
import {
  GovernanceDelegateDialog,
  GovProposalStateEnumColors,
} from '~/governance/common'
import { useDialog } from '~/common/dialog'
import { bignumberUtils } from '~/common/bignumber-utils'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { Link } from '~/common/link'
import { cutAccount } from '~/common/cut-account'
import * as model from './governance-list.model'
import * as styles from './governance-list.css'
import { buildExplorerUrl } from '~/common/build-explorer-url'
import { config } from '~/config'

export type GovernanceListProps = unknown

const DELEGATE_TO_DEFAULT = '0x0000000000000000000000000000000000000000'

const getDelegateButtonText = (votes?: string | null, delegateTo?: string) => {
  if (bignumberUtils.gt(votes, 0)) {
    if (DELEGATE_TO_DEFAULT === delegateTo) {
      return 'Delegate to'
    }

    return 'Redelegate'
  }

  return 'Unlock votes'
}

export const GovernanceList: React.VFC<GovernanceListProps> = () => {
  const [openDelegateOpen] = useDialog(GovernanceDelegateDialog)

  const { account = null } = useStore(walletNetworkModel.$wallet)

  const loading = useStore(model.fetchGovernanceListFx.pending)
  const governanceList = useStore(model.$governanceList)

  const governanceVotes = useStore(model.$governanceVotes)
  const votesLoading = useStore(model.fetchGovernanceVotesFx.pending)

  const delegateLoading = useStore(model.delegateVotesFx.pending)

  useGate(model.GovernanceListGate)

  const handleOpenDelegateOpen = async () => {
    if (!account) return

    try {
      const result = await openDelegateOpen({
        votes: governanceVotes?.votes,
        account,
      })

      model.delegateVotesFx(result)
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <AppLayout>
      <div className={styles.root}>
        {loading && 'loading...'}
        {!votesLoading && bignumberUtils.gt(governanceVotes?.votes, 0) && (
          <div>
            <Typography variant="h4" transform="uppercase" align="center">
              {bignumberUtils.format(governanceVotes?.votes)} Votes
            </Typography>
            {governanceVotes?.delegates && (
              <Typography variant="h4" transform="uppercase" align="center">
                {governanceVotes.delegates !== DELEGATE_TO_DEFAULT && (
                  <>
                    deligated to{' '}
                    <Link
                      href={buildExplorerUrl({
                        address: governanceVotes.delegates,
                        network: config.IS_DEV ? '3' : '1',
                      })}
                      target="_blank"
                    >
                      {cutAccount(governanceVotes?.delegates)}
                    </Link>
                  </>
                )}
                {bignumberUtils.eq(governanceVotes.votes, 0) && (
                  <>Unlock it so you can vote</>
                )}
              </Typography>
            )}
          </div>
        )}
        {!loading && (
          <Button
            onClick={handleOpenDelegateOpen}
            disabled={delegateLoading}
            className={styles.delegate}
          >
            {getDelegateButtonText(
              governanceVotes?.votes,
              governanceVotes?.delegates
            )}
          </Button>
        )}
        {!loading && (
          <Button
            as={ReactRouterLink}
            to={paths.governance.create}
            className={styles.buttonCreateProposal}
            variant="outlined"
          >
            + Create new proposal
          </Button>
        )}
        {!loading && !governanceList.length && 'No proposals yet...'}
        {!loading &&
          Boolean(governanceList.length) &&
          governanceList.map((governanceProposal) => (
            <ReactRouterLink
              to={paths.governance.detail(String(governanceProposal.id))}
              key={governanceProposal.id}
              className={styles.proposal}
            >
              <Paper className={styles.proposalContent}>
                <div>{governanceProposal.title}</div>
                <Chip
                  color={GovProposalStateEnumColors[governanceProposal.state]}
                  className={styles.status}
                >
                  {governanceProposal.state}
                </Chip>
              </Paper>
            </ReactRouterLink>
          ))}
        <model.GovernanceListPagination />
      </div>
    </AppLayout>
  )
}
