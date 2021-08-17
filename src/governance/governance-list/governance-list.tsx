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
import * as model from './governance-list.model'
import * as styles from './governance-list.css'
import { useDialog } from '~/common/dialog'

export type GovernanceListProps = unknown

export const GovernanceList: React.VFC<GovernanceListProps> = () => {
  const [openDelegateOpen] = useDialog(GovernanceDelegateDialog)

  const loading = useStore(model.fetchGovernanceListFx.pending)
  const governanceList = useStore(model.$governanceList)

  const votes = useStore(model.$governanceVotes)
  const votesLoading = useStore(model.fetchGovernanceVotesFx.pending)

  useGate(model.GovernanceListGate)

  console.log(votes, votesLoading)

  const handleOpenDelegateOpen = async () => {
    try {
      const result = await openDelegateOpen()

      console.log(result)
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <AppLayout>
      <div className={styles.root}>
        {loading && 'loading...'}
        {!loading && (
          <div>
            <Typography variant="h4" transform="uppercase" align="center">
              91367647.10 Votes
            </Typography>
            <Typography variant="h4" transform="uppercase" align="center">
              deligated to 0x9403...18d4
            </Typography>
          </div>
        )}
        {!loading && (
          <Button onClick={handleOpenDelegateOpen} className={styles.delegate}>
            Delegate
          </Button>
        )}
        {!loading && !governanceList.length && 'No proposals yet...'}
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
