import { useGate, useStore } from 'effector-react'
import { Link as ReactRouterLink } from 'react-router-dom'

import { AppLayout } from '~/layouts'
import { Paper } from '~/common/paper'
import { paths } from '~/paths'
import { Chip } from '~/common/chip'
import { GovProposalStateEnumColors } from '~/governance/common'
import * as model from './governance-list.model'
import * as styles from './governance-list.css'

export type GovernanceListProps = unknown

export const GovernanceList: React.VFC<GovernanceListProps> = () => {
  const loading = useStore(model.fetchGovernanceListFx.pending)
  const governanceList = useStore(model.$governanceList)

  useGate(model.GovernanceListGate)

  return (
    <AppLayout>
      {loading && 'loading...'}
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
              >
                {governanceProposal.state}
              </Chip>
            </Paper>
          </ReactRouterLink>
        ))}
      <model.GovernanceListPagination />
    </AppLayout>
  )
}
