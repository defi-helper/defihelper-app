import { combine, createDomain, guard, sample } from 'effector-logger'
import { createGate } from 'effector-react'

import {
  BlockchainEnum,
  StakingContractFragmentFragment,
} from '~/graphql/_generated-types'
import { userModel } from '~/users'
import { networkModel } from '~/wallets/wallet-networks'
import { stakingApi } from '~/staking/common'
import { walletNetworkSwitcherModel } from '~/wallets/wallet-network-switcher'
import { createPagination, PaginationState } from '~/common/create-pagination'

export const stakingListDomain = createDomain('stakingList')

type GateState = {
  protocolId: string
  blockchain?: BlockchainEnum
  network?: number
}

export const fetchStakingListFx = stakingListDomain.createEffect({
  name: 'fetchStakingList',
  handler: (params: GateState & PaginationState) =>
    stakingApi.contractList({
      filter: {
        id: params.protocolId,
      },
      ...(params.blockchain
        ? {
            contractFilter: {
              blockchain: {
                protocol: params.blockchain,
                ...(params.network ? { network: String(params.network) } : {}),
              },
            },
          }
        : {}),
      contractPagination: {
        offset: params?.offset,
        limit: params?.limit,
      },
    }),
})

const NOT_DELETED = 'Not deleted'

export const deleteStakingFx = stakingListDomain.createEffect({
  name: 'deleteStakingFx',
  handler: async (id: string) => {
    const isDeleted = await stakingApi.contractDelete(id)

    if (isDeleted) {
      return id
    }

    throw new Error(NOT_DELETED)
  },
})

const NOT_CONNECTED = 'Not connected'

type ConnectParams = {
  contract: string
  wallet: string
}

export const connectWalletFx = stakingListDomain.createEffect({
  name: 'connectWalletFx',
  handler: async (params: ConnectParams) => {
    const isConnected = await stakingApi.connectWallet(params)

    if (isConnected) return

    throw new Error(NOT_CONNECTED)
  },
})

const NOT_DISCONNECTED = 'Not disconnected'

export const disconnectWalletFx = stakingListDomain.createEffect({
  name: 'disconnectWalletFx',
  handler: async (params: ConnectParams) => {
    const isDisconnected = await stakingApi.disconnectWallet(params)

    if (isDisconnected) return

    throw new Error(NOT_DISCONNECTED)
  },
})

export const fetchConnectedContractsFx = stakingListDomain.createEffect({
  name: 'fetchConnectedContractsFx',
  handler: (params: GateState) =>
    stakingApi.connectedContracts(params.protocolId),
})

type Contract = StakingContractFragmentFragment & {
  type: 'Contract'
}

const $contractList = stakingListDomain
  .createStore<Contract[]>([], {
    name: '$contractList',
  })
  .on(fetchStakingListFx.doneData, (_, payload) =>
    payload.contracts.map((contract) => ({ ...contract, type: 'Contract' }))
  )
  .on(deleteStakingFx.doneData, (state, payload) => {
    return state.filter(({ id }) => id !== payload)
  })

const $connectedContracts = stakingListDomain
  .createStore<Record<string, boolean>>(
    {},
    {
      name: '$connectedContracts',
    }
  )
  .on(fetchConnectedContractsFx.doneData, (_, payload) => {
    return payload?.reduce<Record<string, boolean>>((acc, contract) => {
      if (!contract) return acc

      acc[contract.id] = true

      return acc
    }, {})
  })
  .on(connectWalletFx.done, (state, { params }) => ({
    ...state,
    [params.contract]: true,
  }))

const $wallets = userModel.$user.map(
  (user) =>
    user?.wallets.list?.reduce<
      Record<string, { id: string; blockchain: string; network: string }>
    >((acc, { address, id, blockchain, network }) => {
      acc[address.toLowerCase()] = {
        id,
        blockchain,
        network,
      }

      return acc
    }, {}) ?? {}
)

export const $contracts = combine(
  $contractList,
  $connectedContracts,
  $wallets,
  networkModel.$wallet,
  (contractList, connectedContracts, wallets, wallet) => {
    return contractList.map((contract) => ({
      ...contract,
      connected: Boolean(connectedContracts[contract.id]),
      wallet: wallet.account ? wallets[wallet.account.toLowerCase()] : null,
    }))
  }
)

export const StakingListGate = createGate<GateState>({
  name: 'StakingListGate',
  domain: stakingListDomain,
})

export const StakingListPagination = createPagination({
  domain: stakingListDomain,
  limit: 10,
})

const fetchStakingList = sample({
  source: [
    walletNetworkSwitcherModel.$currentNetwork,
    StakingListPagination.state,
  ],
  clock: [
    walletNetworkSwitcherModel.$currentNetwork,
    StakingListGate.open,
    StakingListPagination.pageChanged,
  ],
  fn: ([currentNetwork, pagination]) => ({
    ...currentNetwork,
    ...pagination,
    ...StakingListGate.state.getState(),
  }),
  greedy: true,
})

guard({
  clock: fetchStakingList,
  filter: ({ protocolId }) => Boolean(protocolId),
  target: fetchStakingListFx,
  greedy: true,
})

sample({
  clock: fetchStakingListFx.done,
  fn: ({ params }) => params,
  target: fetchConnectedContractsFx,
  greedy: true,
})

sample({
  clock: fetchStakingListFx.doneData,
  fn: (clock) => clock.pagination,
  target: StakingListPagination.totalElements,
})
