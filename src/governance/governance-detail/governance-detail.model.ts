import { createDomain, restore, sample } from 'effector-logger'
import { createGate } from 'effector-react'

import { config } from '~/config'
import {
  governanceApi,
  parseDescription,
  parseActions,
} from '~/governance/common'

const GOVERNOR_BRAVO = '0xc8E942D9CA1e8dda3e39C7495A55086581D08858'

export const governanceDetailDomain = createDomain('governanceDetailDomain')

export const fetchGovernanceProposalFx = governanceDetailDomain.createEffect({
  name: 'fetchGovernanceProposalFx',
  handler: (proposalId: number) =>
    governanceApi
      .detail({
        filter: {
          proposalId,
          network: config.IS_DEV ? '3' : '1',
          contract: GOVERNOR_BRAVO,
          cache: true,
        },
      })
      .then((governanceProposal) =>
        governanceProposal
          ? {
              ...governanceProposal,
              ...parseDescription(governanceProposal.description),
              actions: parseActions(
                governanceProposal.targets,
                governanceProposal.calldatas,
                governanceProposal.signatures
              ),
            }
          : null
      ),
})

export const castVoteFx = governanceDetailDomain.createEffect({
  name: 'castVoteFx',
  handler: () => {},
})

export const executeFx = governanceDetailDomain.createEffect({
  name: 'executeFx',
  handler: () => {},
})

export const queueFx = governanceDetailDomain.createEffect({
  name: 'queueFx',
  handler: () => {},
})

export const $governanceDetail = restore(
  fetchGovernanceProposalFx.doneData,
  null
)

export const GovernanceDetailGate = createGate<string>({
  name: 'GovernanceDetailGate',
  domain: governanceDetailDomain,
})

sample({
  clock: GovernanceDetailGate.open,
  fn: (clock) => Number(clock),
  target: fetchGovernanceProposalFx,
})
