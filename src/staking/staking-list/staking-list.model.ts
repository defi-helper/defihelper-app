import {
  createDomain,
  guard,
  restore,
  sample,
  UnitValue,
} from 'effector-logger/macro'
import { createGate } from 'effector-react'

import {
  ContractListSortInputTypeColumnEnum,
  SortOrderEnum,
  UserRoleEnum,
} from '~/graphql/_generated-types'
import {
  buildAdaptersUrl,
  ConnectParams,
  Contract,
  FreshMetrics,
  RegisterParams,
  stakingApi,
  StakingListPayload,
} from '~/staking/common'
import { createPagination, PaginationState } from '~/common/create-pagination'
import { toastsService } from '~/toasts'
import * as stakingAdaptersModel from '~/staking/staking-adapters/staking-adapters.model'
import { Adapters, loadAdapter } from '~/common/load-adapter'
import { automationApi } from '~/automations/common/automation.api'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { Wallet } from '~/wallets/common'
import * as settingsWalletModel from '~/settings/settings-wallets/settings-wallets.model'
import * as stakingUpdateModel from '~/staking/staking-update/staking-update.model'
import { authModel } from '~/auth'
import { protocolsApi } from '~/protocols/common'

export const stakingListDomain = createDomain()

const NOT_DELETED = 'Not deleted'
const NOT_REGISTERED = 'Not registered'
const NOT_CONNECTED = 'Not connected'
const NOT_DISCONNECTED = 'Not disconnected'

type Params = StakingListPayload & PaginationState

export const stakingUpdateFx = stakingListDomain.createEffect(
  stakingUpdateModel.contractUpdate
)

export const fetchStakingListFx = stakingListDomain.createEffect(
  async (params: Params) => {
    const data = await stakingApi.contractList({
      filter: {
        id: params.protocolId,
      },
      contractFilter: {
        hidden: params.hidden,
      },
      contractPagination: {
        offset: params.offset,
        limit: params.limit,
      },
      contractSort: [
        {
          column:
            params.sortColumn ?? ContractListSortInputTypeColumnEnum.MyStaked,
          order: params.sortOrder ?? SortOrderEnum.Desc,
        },
        {
          column: ContractListSortInputTypeColumnEnum.AprYear,
          order: SortOrderEnum.Desc,
        },
        {
          column: ContractListSortInputTypeColumnEnum.Name,
          order: SortOrderEnum.Asc,
        },
      ],
    })

    return data
  }
)

export const fetchScannerFx = stakingListDomain.createEffect(
  async (contracts: Contract[]) => {
    const stakingListWithAutostaking = contracts.map(async (contract) => {
      let syncedBlock = -1

      const scannerContract = await stakingApi.scannerGetContract({
        network: contract.network,
        address: contract.address,
      })

      if (scannerContract) {
        const listenedPools = await stakingApi.scannerGetEventListener({
          id: scannerContract.id,
        })

        syncedBlock =
          Math.min(...listenedPools.map(({ syncHeight }) => syncHeight)) || 0
      }

      return {
        scannerId: scannerContract?.id,
        syncedBlock,
        contractId: contract.id,
      }
    })

    return (await Promise.all(stakingListWithAutostaking)).reduce<
      Record<
        string,
        { scannerId?: string; syncedBlock: number; contractId: string }
      >
    >((acc, scannerItem) => {
      acc[scannerItem.contractId] = scannerItem

      return acc
    }, {})
  }
)

export const fetchContractAddressesFx = stakingListDomain.createEffect(
  async (params: { contracts: Contract[]; protocolAdapter?: string }) => {
    const contractAddresses = params.contracts.map(async (contract) => {
      let contractAddress

      if (params.protocolAdapter && contract.automate.autorestake) {
        contractAddress = await automationApi
          .getContractAddress({
            protocol: params.protocolAdapter,
            contract: contract.automate.autorestake,
            chainId: contract.network,
          })
          .catch(console.error)
      }

      return {
        contractId: contract.id,
        prototypeAddress: contractAddress?.address,
      }
    })

    return (await Promise.all(contractAddresses)).reduce<
      Record<
        string,
        { contractId: string; prototypeAddress: string | undefined }
      >
    >((acc, address) => {
      acc[address.contractId] = address

      return acc
    }, {})
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

export const scannerRegisterContractFx = stakingListDomain.createEffect(
  async (params: RegisterParams) => {
    const { id, events } = params
    const done = await protocolsApi.contractScannerRegister({
      id,
      events,
    })

    if (done) {
      return id
    }

    throw new Error(NOT_REGISTERED)
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
  (params: StakingListPayload) =>
    stakingApi.connectedContracts(params.protocolId)
)

export const autostakingStart = stakingListDomain.createEvent<string>()
export const autostakingEnd = stakingListDomain.createEvent<string>()

export const $contractList = stakingListDomain
  .createStore<Contract[]>([])
  .on(fetchStakingListFx.doneData, (_, payload) =>
    payload.contracts.map((contract) => ({
      ...contract,
      type: 'Contract',
    }))
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

export const $contractsListCopies = restore($contractList.updates, []).on(
  stakingUpdateFx.doneData,
  (state, payload) => {
    return state.map((contract) =>
      contract.id === payload?.id
        ? { ...contract, hidden: payload.hidden }
        : contract
    )
  }
)

export const openContract = stakingListDomain.createEvent<string | null>()

export const $openedContract = stakingListDomain
  .createStore<string | null>(null)
  .on(openContract, (_, payload) => payload)
  .on($contractList.updates, (_, contracts) => contracts?.[0]?.address)

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

export const $scanner = stakingListDomain
  .createStore<UnitValue<typeof fetchScannerFx.doneData>>({})
  .on(fetchScannerFx.doneData, (_, payload) => payload)

export const $contractAddresses = stakingListDomain
  .createStore<UnitValue<typeof fetchContractAddressesFx.doneData>>({})
  .on(fetchContractAddressesFx.doneData, (_, payload) => payload)

guard({
  clock: sample({
    source: [settingsWalletModel.$wallets, $connectedContracts],
    clock: stakingAdaptersModel.stake,
    fn: ([wallets, connectedContracts], params) => {
      const findedWallet = wallets.find((wallet) => {
        const sameAddreses =
          String(params.wallet.chainId) === 'main'
            ? params.wallet.account === wallet.address
            : params.wallet.account?.toLowerCase() === wallet.address

        return sameAddreses && String(params.wallet.chainId) === wallet.network
      })

      return {
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
    connected: boolean
  } => Boolean(clock.wallet) && !clock.connected,
  target: connectWalletFx,
})

export const StakingListGate = createGate<StakingListPayload>({
  name: 'StakingListGate',
  domain: stakingListDomain,
})

export const StakingListPagination = createPagination({
  domain: stakingListDomain,
  limit: 20,
})

guard({
  clock: sample({
    source: [StakingListPagination.state, StakingListGate.state],
    clock: [
      StakingListGate.open,
      StakingListGate.state.updates,
      StakingListPagination.updates,
    ],
    fn: ([pagination, gate]) => ({
      ...pagination,
      ...gate,
    }),
  }),
  filter: ({ protocolId }) => Boolean(protocolId),
  target: [fetchStakingListFx, fetchConnectedContractsFx],
})

sample({
  clock: guard({
    source: [$contractsListCopies, authModel.$user],
    clock: [authModel.$user.updates, $contractsListCopies.updates],
    filter: ([contracts, user]) =>
      Boolean(user && contracts.length) && user?.role === UserRoleEnum.Admin,
  }),
  fn: ([contracts]) => contracts,
  target: fetchScannerFx,
})

sample({
  clock: fetchStakingListFx.doneData,
  fn: (clock) => clock.pagination,
  target: StakingListPagination.totalElements,
})

export const fetchMetrics = stakingListDomain.createEvent<{
  wallet: Wallet
  protocolAdapter: string
}>()

export const fetchMetricsFx = stakingListDomain.createEffect(
  async (params: {
    contracts: Contract[]
    wallet: Wallet
    protocolAdapter: string
  }) => {
    const networkProvider = walletNetworkModel.getNetwork(
      params.wallet.provider,
      String(params.wallet.chainId)
    )

    const contracts = params.contracts.map(async (contract) => {
      const adapter = await loadAdapter(
        buildAdaptersUrl(params.protocolAdapter)
      )

      if (!params.wallet.account) return null

      const adapterObj = await adapter[
        contract.adapter as keyof Omit<Adapters, 'automates'>
      ](networkProvider, contract.address, {
        blockNumber: 'latest',
        signer: networkProvider?.getSigner(),
      })

      const wallet = await adapterObj.wallet(params.wallet.account)

      return {
        contractId: contract.id,
        tvl: adapterObj.metrics.tvl,
        aprYear: adapterObj.metrics.aprYear,
        myStaked: wallet.metrics.stakingUSD,
        myEarned: wallet.metrics.earnedUSD,
      }
    })

    return (await Promise.all(contracts))
      .filter((contract): contract is FreshMetrics => Boolean(contract))
      .reduce<Record<string, FreshMetrics>>((acc, contract) => {
        acc[contract.contractId] = contract

        return acc
      }, {})
  }
)

export const $freshMetrics = stakingListDomain
  .createStore<Record<string, FreshMetrics>>({})
  .on(fetchMetricsFx.doneData, (_, payload) => payload)

sample({
  source: $contractList,
  clock: fetchMetrics,
  fn: (contracts, { wallet, protocolAdapter }) => ({
    contracts: contracts.filter(
      (contract) =>
        contract.network === String(wallet.chainId) &&
        contract.blockchain === wallet.blockchain
    ),
    wallet,
    protocolAdapter,
  }),
  target: fetchMetricsFx,
})

sample({
  source: StakingListGate.state,
  clock: $contractsListCopies.updates,
  fn: ({ protocolAdapter }, contracts) => ({
    protocolAdapter: protocolAdapter ?? undefined,
    contracts,
  }),
  target: fetchContractAddressesFx,
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
