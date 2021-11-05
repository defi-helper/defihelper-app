import { createDomain, guard, restore, sample } from 'effector-logger/macro'
import { createGate } from 'effector-react'
import { ethers } from 'ethers'
import contracts from '@defihelper/networks/contracts.json'

import { abi } from '~/abi'
import { createPagination, PaginationState } from '~/common/create-pagination'
import { config } from '~/config'
import { governanceApi, parseDescription } from '~/governance/common'
import { GovVotesFilterInputType } from '~/graphql/_generated-types'
import { walletNetworkModel } from '~/wallets/wallet-networks'

export const governanceListDomain = createDomain('governanceListDomain')

const GOVERNOR_TOKEN = contracts[3].GovernanceToken.address
const GOVERNOR_BRAVO = contracts[3].GovernorBravo.address

export const fetchGovernanceListFx = governanceListDomain.createEffect(
  ({ network, ...pagination }: PaginationState & { network: string }) =>
    governanceApi.list({
      pagination,
      filter: {
        network,
        contract: GOVERNOR_BRAVO,
        cache: true,
      },
    })
)

export const $governanceList = restore(
  fetchGovernanceListFx.doneData.map(({ list }) =>
    list.map((governanceProposal) => ({
      ...governanceProposal,
      ...parseDescription(governanceProposal.description),
    }))
  ),
  []
)

export const fetchGovernanceVotesFx = governanceListDomain.createEffect(
  (filter: GovVotesFilterInputType) =>
    governanceApi.votes({
      filter,
    })
)

export const $governanceVotes = restore(fetchGovernanceVotesFx.doneData, null)

export const delegateVotesFx = governanceListDomain.createEffect(
  async (params: {
    delegateAccount: string
    account: string
    chainId: string
    provider: unknown
  }) => {
    const networkProvider = walletNetworkModel.getNetwork(
      params.provider,
      params.chainId
    )

    if (!networkProvider) return

    const governorBravo = new ethers.Contract(
      GOVERNOR_TOKEN,
      abi.GovernanceToken.abi,
      networkProvider.getSigner()
    )

    const transactionReceipt = await governorBravo.delegate(
      params.delegateAccount
    )

    await transactionReceipt.wait()
  }
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

sample({
  clock: guard({
    source: [walletNetworkModel.$wallet, GovernanceListGate.status],
    clock: [
      GovernanceListGate.open,
      walletNetworkModel.$wallet.updates,
      delegateVotesFx.done,
    ],
    filter: (
      source
    ): source is [{ account: string; chainId: number }, boolean] => {
      const [wallet, gateIsOpened] = source

      return (
        Boolean(wallet.account) &&
        typeof wallet.chainId === 'number' &&
        gateIsOpened
      )
    },
  }),
  fn: ([{ chainId, account }]) => ({
    network: chainId,
    wallet: account,
    contract: GOVERNOR_TOKEN,
  }),
  target: fetchGovernanceVotesFx,
})

sample({
  clock: fetchGovernanceListFx.doneData,
  fn: (clock) => clock.count,
  target: GovernanceListPagination.totalElements,
})
