import { createDomain, guard, restore, sample } from 'effector-logger'
import { createGate } from 'effector-react'
import { ethers } from 'ethers'

import { abi } from '~/abi'
import { createPagination, PaginationState } from '~/common/create-pagination'
import { config } from '~/config'
import { governanceApi, parseDescription } from '~/governance/common'
import { GovVotesFilterInputType } from '~/graphql/_generated-types'
import { walletNetworkModel } from '~/wallets/wallet-networks'

export const governanceListDomain = createDomain('governanceListDomain')

const GOVERNOR_TOKEN = '0xa57fEd13d1558116E90009f872AeC868D710D605'
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
        contract: GOVERNOR_TOKEN,
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

export const delegateVotesFx = governanceListDomain.createEffect({
  name: 'delegateVotesFx',
  handler: async (account: string) => {
    const { networkProvider } = walletNetworkModel.getNetwork()

    if (!networkProvider) return

    const governorBravo = new ethers.Contract(
      GOVERNOR_BRAVO,
      abi.GovernorBravo.abi,
      networkProvider.getSigner()
    )

    const transactionReceipt = await governorBravo.delegate(account)

    await transactionReceipt.wait()
  },
})

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
    clock: [
      GovernanceListGate.open,
      walletNetworkModel.$wallet.updates,
      delegateVotesFx.done,
    ],
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
