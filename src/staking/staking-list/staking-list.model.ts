import { combine, createDomain, guard, sample } from 'effector-logger'
import { createGate } from 'effector-react'

import {
  BlockchainEnum,
  StakingContractFragmentFragment,
} from '~/graphql/_generated-types'
import { userModel } from '~/users'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { stakingApi } from '~/staking/common'
import { walletNetworkSwitcherModel } from '~/wallets/wallet-network-switcher'
import { createPagination, PaginationState } from '~/common/create-pagination'

export const stakingListDomain = createDomain('stakingList')
export const contractsEventListDomain = createDomain('contractsEventList')

type GateState = {
  protocolId: string
  blockchain?: BlockchainEnum
  network?: number | string
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
                ...(params.network !== 'waves'
                  ? { network: String(params.network) }
                  : {}),
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

export const openContract =
  stakingListDomain.createEvent<string>('openContract')

export const $openedContract = stakingListDomain
  .createStore<string | null>(null, {
    name: '$openedContract',
  })
  .on(openContract, (_, payload) => payload)
  .on(walletNetworkSwitcherModel.activateNetwork, () => null)

export const $protocolAdapter = stakingListDomain
  .createStore<string | null>(null, {
    name: '$protocolAdapter',
  })
  .on(fetchStakingListFx.doneData, (_, { adapter }) => adapter)

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
  walletNetworkModel.$wallet,
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
  source: StakingListPagination.state,
  clock: [
    walletNetworkSwitcherModel.$currentNetwork.updates,
    StakingListGate.open,
    StakingListPagination.updates,
  ],
  fn: (pagination) => ({
    ...pagination,
    ...StakingListGate.state.getState(),
  }),
})

guard({
  clock: fetchStakingList,
  filter: ({ protocolId }) => Boolean(protocolId),
  target: fetchStakingListFx,
  greedy: true,
})

sample({
  source: fetchStakingListFx.done,
  clock: [fetchStakingListFx.done, walletNetworkSwitcherModel.$currentNetwork],
  fn: ({ params }) => params,
  target: fetchConnectedContractsFx,
  greedy: true,
})

sample({
  clock: fetchStakingListFx.doneData,
  fn: (clock) => clock.pagination,
  target: StakingListPagination.totalElements,
})

export const fetchContractEventsFx = contractsEventListDomain.createEffect({
  name: 'fetchContractEventsFx',
  handler: async (input: { protocolId: string; contractId: string }) => {
    return stakingApi.contractsEventsList({
      filter: {
        id: input.protocolId,
      },
      contractFilter: {
        id: input.contractId,
      },
    })
  },
})

interface ContractEvent {
  protocolId: string
  contractId: string
  events: string[]
}

export const $contractsEventsList = contractsEventListDomain
  .createStore<Record<string, ContractEvent>>(
    {},
    {
      name: '$contractsEventsList',
    }
  )
  .on(fetchContractEventsFx.done, (state, payload) => {
    const events = (payload.result || []).reduce((res, c) => {
      res[c.id] = res[c.id] || {
        protocolId: c.protocolId,
        contractId: c.id,
        events: [],
      }

      res[c.id].events.push(...c.events)
      return res
    }, {} as Record<string, ContractEvent>)
    return {
      ...state,
      ...events,
    }
  })
