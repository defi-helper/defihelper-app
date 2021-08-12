import { createDomain, restore, sample } from 'effector-logger'
import { createGate } from 'effector-react'

import { createPagination, PaginationState } from '~/common/create-pagination'
import { config } from '~/config'
import { governanceApi, parseDescription } from '~/governance/common'

export const governanceListDomain = createDomain('governanceListDomain')

const GOVERNOR_BRAVO = '0xc8E942D9CA1e8dda3e39C7495A55086581D08858'

export const fetchGovernanceListFx = governanceListDomain.createEffect({
  name: 'fetchGovernanceListFx',
  handler: ({
    network,
    ...pagination
  }: PaginationState & { network: string }) =>
    governanceApi.list({
      pagination,
      filter: {
        network,
        contract: GOVERNOR_BRAVO,
        cache: true,
      },
    }),
})

export const $governanceList = restore(
  fetchGovernanceListFx.doneData.map(({ list }) =>
    list.map((governanceProposal) => ({
      ...governanceProposal,
      ...parseDescription(governanceProposal.description),
    }))
  ),
  []
)

export const GovernanceListPagination = createPagination({
  domain: governanceListDomain,
})

export const GovernanceListGate = createGate({
  domain: governanceListDomain,
  name: 'GovernanceListGate',
})

sample({
  source: GovernanceListPagination.state,
  clock: [GovernanceListGate.open, GovernanceListPagination.updates],
  fn: (pagination) => ({
    ...pagination,
    network: config.IS_DEV ? '3' : '1',
  }),
  target: fetchGovernanceListFx,
})
