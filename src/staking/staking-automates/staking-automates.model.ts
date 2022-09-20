import { createDomain, sample, guard, UnitValue, StoreValue } from 'effector'
import { createGate } from 'effector-react'
import omit from 'lodash.omit'

import { authModel } from '~/auth'
import { Adapters, loadAdapter } from '~/common/load-adapter'
import { UserType } from '~/api/_generated-types'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import * as deployModel from '~/automations/automation-deploy-contract/automation-deploy-contract.model'
import * as automationsListModel from '~/automations/automation-list/automation-list.model'
import {
  buildAdaptersUrl,
  FreshMetrics,
  stakingApi,
  StakingAutomatesContract,
} from '../common'
import { Wallet, walletApi } from '~/wallets/common'
import { bignumberUtils } from '~/common/bignumber-utils'
import { settingsWalletModel } from '~/settings/settings-wallets'

export type ActionType = 'deposit' | 'migrate' | 'refund' | 'run' | 'stopLoss'

type FetchAdapterParams = {
  protocolAdapter: string
  contractAdapter: string
  contractAddress: string
  provider: unknown
  chainId: string
  action: ActionType
  contractId: string
}

type FetchAutomatesParams = {
  userId: string
  protocolId?: string
  search?: string
}

const LOAD_TYPES: Record<
  ActionType,
  'migrating' | 'depositing' | 'refunding' | 'running' | 'stopLoss'
> = {
  migrate: 'migrating',
  deposit: 'depositing',
  refund: 'refunding',
  run: 'running',
  stopLoss: 'stopLoss',
}

export const stakingAutomatesDomain = createDomain()

export const fetchAutomatesContractsFx = stakingAutomatesDomain.createEffect(
  async (params: FetchAutomatesParams) => {
    const data = await stakingApi.automatesContractList({
      filter: {
        user: params.userId,
        archived: false,
        ...(params.protocolId ? { protocol: params.protocolId } : {}),
        search: params.search,
      },
    })

    return data
  }
)

export const scanWalletMetricFx = stakingAutomatesDomain.createEffect(
  walletApi.scanWalletMetric
)

export const fetchAdapterFx = stakingAutomatesDomain.createEffect(
  async (params: FetchAdapterParams) => {
    const networkProvider = walletNetworkModel.getNetwork(
      params.provider,
      params.chainId
    )

    if (!networkProvider) return

    const adapter = await loadAdapter(buildAdaptersUrl(params.protocolAdapter))

    return adapter.automates[params.contractAdapter]?.(
      networkProvider.getSigner(),
      params.contractAddress
    )
  }
)

export const reset = stakingAutomatesDomain.createEvent()

export const $automatesContracts = stakingAutomatesDomain
  .createStore<StakingAutomatesContract[]>([])
  .on(fetchAutomatesContractsFx.doneData, (_, { list }) => list)
  .on(fetchAdapterFx, (state, payload) =>
    state.map((contract) => {
      return contract.id === payload.contractId
        ? { ...contract, [LOAD_TYPES[payload.action]]: true }
        : contract
    })
  )
  .on(reset, (state) =>
    state.map((contract) =>
      omit(contract, [
        'migrating',
        'depositing',
        'refunding',
        'running',
        'stopLoss',
      ])
    )
  )
  .on(automationsListModel.deleteContractFx, (state, payload) =>
    state.map((contract) =>
      contract.id === payload ? { ...contract, deleting: true } : contract
    )
  )
  .on(automationsListModel.deleteContractFx.done, (state, { params }) =>
    state.filter((contract) => contract.id !== params)
  )

export const $automatesContractsLoaded = stakingAutomatesDomain
  .createStore<boolean>(false)
  .on(fetchAutomatesContractsFx.finally, () => true)

type Gate = {
  protocolId?: string
  search?: string
}

export const StakingAutomatesGate = createGate<Gate | null>({
  name: 'StakingAutomatesGate',
  domain: stakingAutomatesDomain,
  defaultState: null,
})

export const updated = stakingAutomatesDomain.createEvent()

sample({
  clock: guard({
    source: [
      authModel.$user,
      StakingAutomatesGate.status,
      StakingAutomatesGate.state,
    ],
    clock: [
      authModel.$user.updates,
      StakingAutomatesGate.open,
      StakingAutomatesGate.state.updates,
      updated,
    ],
    filter: (source): source is [UserType, boolean, Gate] => {
      const [user, status] = source

      return Boolean(user?.id) && status
    },
  }),
  fn: ([user, , gate]) => ({
    userId: user.id,
    protocolId: gate?.protocolId,
    search: gate?.search,
  }),
  target: fetchAutomatesContractsFx,
})

const contractCreated = guard({
  clock: sample({
    source: StakingAutomatesGate.status,
    clock: deployModel.deployFx.doneData,
    fn: (opened, contract) => ({ opened, contract }),
  }),
  filter: ({ opened }) => opened,
}).map(({ contract }) => contract)

export const fetchMetrics = stakingAutomatesDomain.createEvent<Wallet>()

export const fetchMetricsFx = stakingAutomatesDomain.createEffect(
  async (params: {
    contracts: StakingAutomatesContract[]
    wallet: Wallet
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
          if (!contract.contract) return previousAcc

          const adapter = await loadAdapter(
            buildAdaptersUrl(contract.protocol.adapter)
          )

          const adapterFn =
            adapter[
              contract.contract.adapter as keyof Omit<
                Adapters,
                'automates' | 'store' | 'balance'
              >
            ]

          if (!adapterFn) return previousAcc

          const adapterObj = await adapterFn(
            networkProvider,
            contract.contract.address,
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

export const $freshMetrics = stakingAutomatesDomain
  .createStore<UnitValue<typeof fetchMetricsFx.doneData>>({
    errors: {},
    metrics: {},
  })
  .on(fetchMetricsFx.doneData, (_, payload) => payload)

guard({
  clock: sample({
    source: [$automatesContracts, settingsWalletModel.$wallets],
    clock: fetchMetrics,
    fn: ([contracts, wallets], wallet) => ({ contracts, wallets, wallet }),
  }),
  filter: ({ contracts, wallets, wallet }) =>
    Boolean(contracts.length && wallets.length && wallet.account),
  target: fetchMetricsFx,
})

$automatesContracts.on(contractCreated, (state, payload) => [...state, payload])
$automatesContracts.reset(StakingAutomatesGate.close)
$automatesContractsLoaded.reset(StakingAutomatesGate.close)
