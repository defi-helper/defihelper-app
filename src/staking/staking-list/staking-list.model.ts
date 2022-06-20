import {
  createDomain,
  guard,
  restore,
  sample,
  UnitValue,
  StoreValue,
} from 'effector-logger/macro'
import { createGate } from 'effector-react'

import {
  ContractListSortInputTypeColumnEnum,
  SortOrderEnum,
  UserRoleEnum,
} from '~/api/_generated-types'
import {
  buildAdaptersUrl,
  ConnectParams,
  Contract,
  FreshMetrics,
  RegisterParams,
  stakingApi,
  StakingListPayload,
  WatcherEventListener,
} from '~/staking/common'
import { PaginationState } from '~/common/create-pagination'
import { bignumberUtils } from '~/common/bignumber-utils'
import { toastsService } from '~/toasts'
import * as stakingAdaptersModel from '~/staking/staking-adapters/staking-adapters.model'
import * as stakingAutomatesModel from '~/staking/staking-automates/staking-automates.model'
import { Adapters, loadAdapter } from '~/common/load-adapter'
import { automationApi } from '~/automations/common/automation.api'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { Wallet } from '~/wallets/common'
import * as settingsWalletModel from '~/settings/settings-wallets/settings-wallets.model'
import * as stakingUpdateModel from '~/staking/staking-update/staking-update.model'
import { authModel } from '~/auth'
import { createUseInfiniteScroll } from '~/common/create-use-infinite-scroll'

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
        ...(params.search ? { search: params.search } : {}),
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
      let pools: WatcherEventListener[] = []

      const scannerContract = await stakingApi.scannerGetContract(contract.id)
      if (scannerContract) {
        pools = await stakingApi.scannerGetEventListener({
          id: scannerContract.id,
        })
      }

      return {
        scannerId: scannerContract?.id,
        pools,
        contractId: contract.id,
      }
    })

    return (await Promise.all(stakingListWithAutostaking)).reduce<
      Record<
        string,
        {
          scannerId?: string
          pools: WatcherEventListener[]
          contractId: string
        }
      >
    >((acc, scannerItem) => {
      acc[scannerItem.contractId] = scannerItem
      return acc
    }, {})
  }
)

export const fetchContractAddressesFx = stakingListDomain.createEffect(
  async (params: { contracts: Contract[]; protocolAdapter?: string }) => {
    const contracts = params.contracts.map(({ id, network, automate }) => ({
      id,
      network,
      autorestake: automate.autorestake,
    }))

    return automationApi.getContractsAddresses(
      contracts,
      params.protocolAdapter
    )
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
    const done = await stakingApi.contractScannerRegister({
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

export const updateMetricsFx = stakingListDomain.createEffect(
  async (params: string) => {
    const data = await stakingApi.updateMetrics(params)

    if (data === null || data === undefined) throw new Error('not updated')

    return data
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
  .on(fetchStakingListFx.doneData, (state, payload) =>
    state
      .filter(
        ({ id }) => !payload.contracts.some((contract) => id === contract.id)
      )
      .concat(
        payload.contracts.map((contract) => ({
          ...contract,
          type: 'Contract',
        }))
      )
  )
  .on(deleteStakingFx.doneData, (state, payload) => {
    return state.filter(({ id }) => id !== payload)
  })

export const $autostaking = stakingListDomain
  .createStore<Record<string, boolean>>({})
  .on(autostakingStart, (state, payload) => ({ ...state, [payload]: true }))
  .on(autostakingEnd, (state, payload) => ({ ...state, [payload]: false }))

export const $contractsListCopies = restore($contractList.updates, []).on(
  stakingUpdateFx.doneData,
  (state, payload) => {
    return state.map((contract) =>
      contract.id === payload?.id ? { ...contract, ...payload } : contract
    )
  }
)

export const openContract = stakingListDomain.createEvent<string | null>()

export const $openedContract = stakingListDomain
  .createStore<string | null>(null)
  .on(openContract, (_, payload) => payload)
  .on($contractList.updates, (state, contracts) =>
    state !== null ? undefined : contracts?.[0]?.address
  )

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

export const useInfiniteScroll = createUseInfiniteScroll({
  domain: stakingListDomain,
  limit: 20,
  items: $contractsListCopies,
  loading: fetchStakingListFx.pending,
})
$contractList.reset(useInfiniteScroll.reset)

sample({
  clock: StakingListGate.state.updates,
  target: useInfiniteScroll.reset,
})

guard({
  clock: sample({
    source: [
      useInfiniteScroll.state,
      StakingListGate.state,
      StakingListGate.status,
    ],
    clock: [
      StakingListGate.state.updates,
      StakingListGate.status.updates,
      useInfiniteScroll.updates,
      stakingAutomatesModel.updated,
    ],
    fn: ([pagination, gate, opened]) => ({
      ...pagination,
      ...gate,
      opened,
    }),
  }),
  filter: ({ protocolId, opened }) => Boolean(protocolId) && opened,
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
  target: useInfiniteScroll.totalElements,
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
    wallets: StoreValue<typeof settingsWalletModel.$wallets>
  }) => {
    const networkProvider = walletNetworkModel.getNetwork(
      params.wallet.provider,
      String(params.wallet.chainId)
    )

    const result = await params.contracts.reduce<
      Promise<{
        metrics: Record<string, FreshMetrics>
        errors: Record<string, string>
      }>
    >(
      async (acc, contract) => {
        const previousAcc = await acc

        try {
          const adapter = await loadAdapter(
            buildAdaptersUrl(params.protocolAdapter)
          )

          const adapterFn =
            adapter[contract.adapter as keyof Omit<Adapters, 'automates'>]

          if (!adapterFn) return previousAcc

          const adapterObj = await adapterFn(
            networkProvider,
            contract.address,
            {
              blockNumber: 'latest',
              signer: networkProvider?.getSigner(),
            }
          )

          const walletMetricsPromise = await Promise.all(
            params.wallets.map((wallet) => adapterObj.wallet(wallet.address))
          )

          const walletMetrics = walletMetricsPromise.reduce(
            (accum, wallet) => {
              return {
                stakingUSD: bignumberUtils.plus(
                  accum.stakingUSD,
                  wallet.metrics.stakingUSD
                ),
                earnedUSD: bignumberUtils.plus(
                  accum.earnedUSD,
                  wallet.metrics.earnedUSD
                ),
              }
            },
            {
              stakingUSD: '0',
              earnedUSD: '0',
            }
          )

          previousAcc.metrics = {
            ...previousAcc.metrics,
            [contract.id]: {
              contractId: contract.id,
              tvl: adapterObj.metrics.tvl,
              aprYear: adapterObj.metrics.aprYear,
              myStaked: walletMetrics.stakingUSD,
              myEarned: walletMetrics.earnedUSD,
            },
          }
        } catch (error) {
          if (!(error instanceof Error)) return previousAcc

          previousAcc.errors = {
            ...previousAcc.errors,
            [contract.id]: `${error.name}: ${error.message}`,
          }
        }

        return previousAcc
      },
      Promise.resolve({
        errors: {},
        metrics: {},
      })
    )

    return result
  }
)

export const $freshMetrics = stakingListDomain
  .createStore<UnitValue<typeof fetchMetricsFx.doneData>>({
    errors: {},
    metrics: {},
  })
  .on(fetchMetricsFx.doneData, (_, payload) => payload)

sample({
  source: [$contractsListCopies, settingsWalletModel.$wallets],
  clock: fetchMetrics,
  fn: ([contracts, wallets], { wallet, protocolAdapter }) => ({
    contracts: contracts.filter(
      (contract) =>
        contract.network === String(wallet.chainId) &&
        contract.blockchain === wallet.blockchain
    ),
    wallet,
    protocolAdapter,
    wallets: wallets.filter(
      ({ blockchain, network }) =>
        blockchain === wallet.blockchain && network === wallet.chainId
    ),
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

guard({
  clock: updateMetricsFx.doneData,
  filter: (clock) => clock,
  target: toastsService.success.prepend(() => 'Update page!'),
})

toastsService.forwardErrors(
  fetchStakingListFx.failData,
  fetchConnectedContractsFx.failData,
  disconnectWalletFx.failData,
  connectWalletFx.failData,
  deleteStakingFx.failData,
  updateMetricsFx.failData
)

$contractList.reset(StakingListGate.close)
$connectedContracts.reset(StakingListGate.close)
$freshMetrics.reset(StakingListGate.close)
$scanner.reset(StakingListGate.close)
$contractAddresses.reset(StakingListGate.close)
$openedContract.reset(StakingListGate.close)
