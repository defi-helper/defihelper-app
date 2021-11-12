import { combine, createDomain, guard, sample } from 'effector-logger/macro'
import { createGate } from 'effector-react'

import {
  BlockchainEnum,
  MetricChartType,
  StakingContractFragmentFragment,
} from '~/graphql/_generated-types'
import { userModel } from '~/users'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { stakingApi } from '~/staking/common'
import { createPagination, PaginationState } from '~/common/create-pagination'

export const stakingListDomain = createDomain()

type GateState = {
  protocolId: string
  blockchain?: BlockchainEnum
  network?: number | string
}

type ConnectParams = {
  contract: string
  wallet: string
}

type Contract = StakingContractFragmentFragment & {
  type: 'Contract'
}

export type ContractMetric = {
  tvl: Array<Pick<MetricChartType, 'avg'>>
  apr: Array<Pick<MetricChartType, 'avg'>>
  stakingUSD: Array<Pick<MetricChartType, 'avg'>>
  earnedUSD: Array<Pick<MetricChartType, 'avg'>>
}

const NOT_DELETED = 'Not deleted'
const NOT_CONNECTED = 'Not connected'
const NOT_DISCONNECTED = 'Not disconnected'

export const fetchStakingListFx = stakingListDomain.createEffect(
  (params: GateState & PaginationState) =>
    stakingApi.contractList({
      filter: {
        id: params.protocolId,
      },
      ...(params.blockchain
        ? {
            contractFilter: {
              blockchain: {
                protocol: params.blockchain,
                ...(params.network && params.network !== 'waves'
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
    })
)

export const deleteStakingFx = stakingListDomain.createEffect(
  async (id: string) => {
    const isDeleted = await stakingApi.contractDelete(id)

    if (isDeleted) {
      return id
    }

    throw new Error(NOT_DELETED)
  }
)

export const connectWalletFx = stakingListDomain.createEffect(
  async (params: ConnectParams) => {
    const isConnected = await stakingApi.connectWallet(params)

    if (isConnected) return

    throw new Error(NOT_CONNECTED)
  }
)

export const disconnectWalletFx = stakingListDomain.createEffect(
  async (params: ConnectParams) => {
    const isDisconnected = await stakingApi.disconnectWallet(params)

    if (isDisconnected) return

    throw new Error(NOT_DISCONNECTED)
  }
)

export const fetchConnectedContractsFx = stakingListDomain.createEffect(
  (params: GateState) => stakingApi.connectedContracts(params.protocolId)
)

export const fetchContractMetricFx = stakingListDomain.createEffect(
  (contractIds: string[]) =>
    stakingApi.contractMetric({
      metricFilter: {
        contract: contractIds,
      },
    })
)

export const $contractList = stakingListDomain
  .createStore<Contract[]>([])
  .on(fetchStakingListFx.doneData, (_, payload) =>
    payload.contracts.map((contract) => ({ ...contract, type: 'Contract' }))
  )
  .on(deleteStakingFx.doneData, (state, payload) => {
    return state.filter(({ id }) => id !== payload)
  })

export const openContract = stakingListDomain.createEvent<string>()

export const $openedContract = stakingListDomain
  .createStore<string | null>(null)
  .on(openContract, (_, payload) => payload)

export const $protocolAdapter = stakingListDomain
  .createStore<string | null>(null)
  .on(fetchStakingListFx.doneData, (_, { adapter }) => adapter)

const $connectedContracts = stakingListDomain
  .createStore<Record<string, boolean>>({})
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

const $wallets = userModel.$userWallets.map(
  (wallets) =>
    wallets.reduce<
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
})

const fetchStakingList = sample({
  source: StakingListPagination.state,
  clock: [StakingListGate.open, StakingListPagination.updates],
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
