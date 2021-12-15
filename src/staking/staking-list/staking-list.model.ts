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
import * as stakingAdaptersModel from '~/staking/staking-adapters/staking-adapters.model'
import { authModel } from '~/auth'
import { AdapterActions } from '~/common/load-adapter'
import { automationApi } from '~/automations/common/automation.api'
import { config } from '~/config'

export const stakingListDomain = createDomain()

type GateState = {
  protocolId: string
  protocolAdapter?: string | null
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
  prototypeAddress?: string
  autostakingLoading?: boolean
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
        balance: Number(contract.metric.myStaked) || config.FIX_SUM,
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

      if (!params.protocolAdapter || !contract.automate.autorestake) {
        return {
          ...contract,
          prototypeAddress: undefined,
          autostaking: bignumberUtils.minus(
            autostakingApy,
            contract.metric.aprYear
          ),
        }
      }

      const contractAddress = await automationApi
        .getContractAddress({
          protocol: params.protocolAdapter,
          contract: contract.automate.autorestake,
          chainId: contract.network,
        })
        .catch(console.error)

      return {
        ...contract,
        prototypeAddress: contractAddress?.address,
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

export const autostakingStart = stakingListDomain.createEvent<string>()
export const autostakingEnd = stakingListDomain.createEvent<string>()

export const $contractList = stakingListDomain
  .createStore<Contract[]>([])
  .on(fetchStakingListFx.doneData, (_, payload) =>
    payload.contracts.map((contract) => ({ ...contract, type: 'Contract' }))
  )
  .on(deleteStakingFx.doneData, (state, payload) => {
    return state.filter(({ id }) => id !== payload)
  })
  .on(autostakingStart, (state, payload) => {
    return state.map((contract) =>
      contract.id === payload
        ? { ...contract, autostakingLoading: true }
        : contract
    )
  })
  .on(autostakingEnd, (state, payload) => {
    return state.map((contract) =>
      contract.id === payload
        ? { ...contract, autostakingLoading: false }
        : contract
    )
  })

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

guard({
  clock: sample({
    source: [authModel.$userWallets, $connectedContracts],
    clock: stakingAdaptersModel.contractActionFx.done,
    fn: ([wallets, connectedContracts], { params }) => {
      const findedWallet = wallets.find((wallet) => {
        const sameAddreses =
          String(params.wallet.chainId) === 'W'
            ? params.wallet.account === wallet.address
            : params.wallet.account?.toLowerCase() === wallet.address

        return sameAddreses && String(params.wallet.chainId) === wallet.network
      })

      return {
        action: params.action,
        contract: params.contractId,
        wallet: findedWallet?.id,
        connected: Boolean(connectedContracts[params.contractId]),
      }
    },
  }),
  filter: (
    clock
  ): clock is {
    contract: string
    wallet: string
    action: keyof AdapterActions
    connected: boolean
  } => clock.action === 'stake' && Boolean(clock.wallet) && !clock.connected,
  target: connectWalletFx,
})

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

$contractList.reset(StakingListGate.close)
$connectedContracts.reset(StakingListGate.close)
