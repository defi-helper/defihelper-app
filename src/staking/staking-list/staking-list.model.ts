import { createDomain, guard, sample } from 'effector-logger/macro'
import { createGate } from 'effector-react'

import {
  BlockchainEnum,
  MetricChartType,
  StakingContractFragmentFragment,
} from '~/graphql/_generated-types'
import { stakingApi } from '~/staking/common'
import { createPagination, PaginationState } from '~/common/create-pagination'
import { bignumberUtils } from '~/common/bignumber-utils'
import { protocolsApi } from '~/protocols/common'
import { toastsService } from '~/toasts'

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
  autostaking: string
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
  async (params: GateState & PaginationState) => {
    const data = await stakingApi.contractList({
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
        offset: params.offset,
        limit: params.limit,
      },
    })

    const stakingListWithAutostaking = data.contracts.map(async (contract) => {
      const result = await protocolsApi.protocolEstimated({
        balance: Number(contract.metric.myStaked),
        apy: Number(contract.metric.aprYear),
      })

      const [lastAutostakingValue] = result?.optimal.slice(-1) ?? []

      const autostakingApy = bignumberUtils.mul(
        bignumberUtils.div(
          bignumberUtils.minus(
            lastAutostakingValue?.v,
            contract.metric.myStaked
          ),
          contract.metric.myStaked
        ),
        100
      )

      return {
        ...contract,
        autostaking: bignumberUtils.minus(
          autostakingApy,
          contract.metric.aprYear
        ),
      }
    })

    return {
      ...data,
      contracts: await Promise.all(stakingListWithAutostaking),
    }
  }
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

export const $contractList = stakingListDomain
  .createStore<Contract[]>([])
  .on(fetchStakingListFx.doneData, (_, payload) =>
    payload.contracts.map((contract) => ({ ...contract, type: 'Contract' }))
  )
  .on(deleteStakingFx.doneData, (state, payload) => {
    return state.filter(({ id }) => id !== payload)
  })

export const $protocolAdapter = stakingListDomain
  .createStore<string | null>(null)
  .on(fetchStakingListFx.doneData, (_, { adapter }) => adapter)

export const $connectedContracts = stakingListDomain
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
  .on(disconnectWalletFx.done, (state, { params }) => ({
    ...state,
    [params.contract]: false,
  }))

export const StakingListGate = createGate<GateState>({
  name: 'StakingListGate',
  domain: stakingListDomain,
})

export const StakingListPagination = createPagination({
  domain: stakingListDomain,
})

const fetchStakingList = sample({
  source: [StakingListPagination.state, StakingListGate.state],
  clock: [StakingListGate.open, StakingListPagination.updates],
  fn: ([pagination, gate]) => ({
    ...pagination,
    ...gate,
  }),
})

guard({
  clock: fetchStakingList,
  filter: ({ protocolId }) => Boolean(protocolId),
  target: [fetchStakingListFx, fetchConnectedContractsFx],
})

sample({
  clock: fetchStakingListFx.doneData,
  fn: (clock) => clock.pagination,
  target: StakingListPagination.totalElements,
})

toastsService.forwardErrors(
  fetchStakingListFx.failData,
  fetchConnectedContractsFx.failData,
  disconnectWalletFx.failData,
  connectWalletFx.failData,
  deleteStakingFx.failData
)
