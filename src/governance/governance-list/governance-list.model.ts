import { createDomain, guard, restore, sample } from 'effector-logger'
import { createGate } from 'effector-react'

import { createPagination, PaginationState } from '~/common/create-pagination'
import { config } from '~/config'
import { governanceApi, parseDescription } from '~/governance/common'
import { GovVotesFilterInputType } from '~/graphql/_generated-types'
import { walletNetworkModel } from '~/wallets/wallet-networks'

export const governanceListDomain = createDomain('governanceListDomain')

const GOVERNOR_BRAVO = '0xc8E942D9CA1e8dda3e39C7495A55086581D08858'

// eslint-disable-next-line no-unused-vars
const DELEGATE_TO_DEFAULT = '0x0000000000000000000000000000000000000000'

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

export const fetchGovernanceVotesFx = governanceListDomain.createEffect({
  name: 'fetchGovernanceVotesFx',
  handler: (filter: GovVotesFilterInputType) =>
    governanceApi.votes({
      filter,
    }),
})

export const $governanceVotes = restore(fetchGovernanceVotesFx.doneData, null)

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

sample({
  clock: guard({
    source: walletNetworkModel.$wallet,
    clock: [GovernanceListGate.open, walletNetworkModel.$wallet.updates],
    filter: (wallet): wallet is { account: string; chainId: number } =>
      Boolean(wallet.account) && typeof wallet.chainId === 'number',
  }),
  fn: ({ chainId, account }) => ({
    network: chainId,
    wallet: account,
    contract: GOVERNOR_BRAVO,
  }),
  target: fetchGovernanceVotesFx,
})
