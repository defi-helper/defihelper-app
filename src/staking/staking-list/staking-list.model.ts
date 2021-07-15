import { combine, createDomain, guard, sample } from 'effector-logger'
import { createGate } from 'effector-react'

import { config } from '~/config'
import {
  loadAdapter,
  AdapterActions,
  Adapter,
  AdapterWallet
} from '~/common/load-adapter'
import {
  BlockchainEnum,
  StakingContractFragmentFragment
} from '~/graphql/_generated-types'
import { userModel } from '~/users'
import { networkModel } from '~/wallets/wallet-networks'
import { stakingApi } from '~/staking/common'
import { walletNetworkSwitcherModel } from '~/wallets/wallet-network-switcher'

export const stakingListDomain = createDomain('stakingList')

type GateState = {
  protocolId: string
  protocolAdapter?: string
  blockchain?: BlockchainEnum
  network?: number
}

export const fetchStakingListFx = stakingListDomain.createEffect({
  name: 'fetchStakingList',
  handler: (params: GateState) =>
    stakingApi.contractList({
      filter: {
        id: params.protocolId
      },
      ...(params.blockchain
        ? {
            contractFilter: {
              blockchain: {
                protocol: params.blockchain,
                ...(params.network ? { network: String(params.network) } : {})
              }
            }
          }
        : {})
    })
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
  }
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
  }
})

const NOT_DISCONNECTED = 'Not disconnected'

export const disconnectWalletFx = stakingListDomain.createEffect({
  name: 'disconnectWalletFx',
  handler: async (params: ConnectParams) => {
    const isDisconnected = await stakingApi.disconnectWallet(params)

    if (isDisconnected) return

    throw new Error(NOT_DISCONNECTED)
  }
})

export const fetchConnectedContractsFx = stakingListDomain.createEffect({
  name: 'fetchConnectedContractsFx',
  handler: (params: GateState) =>
    stakingApi.connectedContracts(params.protocolId)
})

type Contract = StakingContractFragmentFragment & {
  type: 'Contract'
}

const $contractList = stakingListDomain
  .createStore<Contract[]>([], {
    name: '$contractList'
  })
  .on(fetchStakingListFx.doneData, (_, payload) =>
    payload.map((contract) => ({ ...contract, type: 'Contract' }))
  )
  .on(deleteStakingFx.doneData, (state, payload) => {
    return state.filter(({ id }) => id !== payload)
  })

const $connectedContracts = stakingListDomain
  .createStore<Record<string, boolean>>(
    {},
    {
      name: '$connectedContracts'
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
    [params.contract]: true
  }))

type FetchContract = {
  params: GateState
  result: Contract[]
}

const buildAdaptersUrl = (protocolAdapter?: string) => {
  if (!protocolAdapter) throw new Error('protocolAdapter is required')

  return `${config.ADAPTERS_HOST}adapters/${protocolAdapter}.js`
}

export const fetchContractAdaptersFx = stakingListDomain.createEffect({
  name: 'fetchContractAdaptersFx',
  handler: (done: { params: GateState; result: Contract[] }) => {
    const network = networkModel.getNetwork()

    return Promise.all(
      done.result.map(async (contract) => {
        const adapterContract = await loadAdapter(
          buildAdaptersUrl(done.params.protocolAdapter),
          contract.adapter
        )

        const adapter = await adapterContract(
          network.networkProvider,
          contract.address,
          {
            blockNumber: 'latest',
            signer: network.networkProvider?.getSigner()
          }
        )

        const wallet = network.account
          ? await adapter.wallet(network.account)
          : null

        const actions = network.account
          ? await adapter.actions(network.account)
          : null

        return {
          contractAddress: contract.address,
          wallet,
          metrics: adapter.metrics,
          staking: adapter.staking,
          reward: adapter.reward,
          actions
        }
      })
    )
  }
})

type StakingAdapter = {
  wallet: null | AdapterWallet
  actions: null | AdapterActions
  contractAddress: string
  metrics: Adapter['metrics']
  staking: Adapter['staking']
  reward: Adapter['reward']
}

export const $adapters = stakingListDomain
  .createStore<Record<string, StakingAdapter>>({}, { name: '$adapters' })
  .on(fetchContractAdaptersFx.doneData, (_, payload) =>
    payload.reduce<Record<string, StakingAdapter>>((acc, adapter) => {
      acc[adapter.contractAddress] = adapter

      return acc
    }, {})
  )

const $wallets = userModel.$user.map(
  (user) =>
    user?.wallets.list?.reduce<
      Record<string, { id: string; blockchain: string; network: string }>
    >((acc, { address, id, blockchain, network }) => {
      acc[address] = {
        id,
        blockchain,
        network
      }

      return acc
    }, {}) ?? {}
)

export const $contracts = combine(
  $contractList,
  $connectedContracts,
  $wallets,
  networkModel.$wallet,
  $adapters,
  (contractList, connectedContracts, wallets, wallet, adapters) => {
    return contractList.map((contract) => ({
      ...contract,
      connected: Boolean(connectedContracts[contract.id]),
      wallet: wallet.account ? wallets[wallet.account] : null,
      formAdapter: adapters[contract.address]
    }))
  }
)

export const StakingListGate = createGate<GateState>({
  name: 'StakingListGate',
  domain: stakingListDomain
})

const Open = guard({
  source: userModel.$user,
  clock: StakingListGate.open,
  filter: (user) => !user
})

const fetchStakingList = sample({
  source: walletNetworkSwitcherModel.$currentNetwork,
  clock: [walletNetworkSwitcherModel.activateNetwork, Open],
  fn: (source) => ({ ...source, ...StakingListGate.state.getState() }),
  greedy: true
})

guard({
  clock: fetchStakingList,
  filter: ({ protocolId }) => Boolean(protocolId),
  target: [fetchStakingListFx, fetchConnectedContractsFx]
})

const fetchStakingListDone = guard({
  clock: fetchStakingListFx.done,
  filter: (done): done is FetchContract =>
    Boolean(done.params && done.result) && Boolean(done.params.protocolAdapter),
  greedy: true
})

sample({
  source: networkModel.$wallet,
  clock: fetchStakingListDone,
  fn: (source, clock) => ({ ...clock, provider: source.provider }),
  target: fetchContractAdaptersFx,
  greedy: true
})
