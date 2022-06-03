import { createDomain, sample, guard } from 'effector-logger/macro'
import { createGate } from 'effector-react'
import omit from 'lodash.omit'

import { authModel } from '~/auth'
import { loadAdapter } from '~/common/load-adapter'
import { UserType } from '~/api/_generated-types'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import * as deployModel from '~/automations/automation-deploy-contract/automation-deploy-contract.model'
import * as automationsListModel from '~/automations/automation-list/automation-list.model'
import {
  buildAdaptersUrl,
  stakingApi,
  StakingAutomatesContract,
} from '../common'
import { walletApi } from '~/wallets/common'

export type ActionType = 'deposit' | 'migrate' | 'refund' | 'run'

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
}

type ScanWalletMetricParams = {
  walletId: string
  contractId: string
}

const LOAD_TYPES: Record<
  ActionType,
  'migrating' | 'depositing' | 'refunding' | 'running'
> = {
  migrate: 'migrating',
  deposit: 'depositing',
  refund: 'refunding',
  run: 'running',
}

export const stakingAutomatesDomain = createDomain()

export const fetchAutomatesContractsFx = stakingAutomatesDomain.createEffect(
  async (params: FetchAutomatesParams) => {
    const data = await stakingApi.automatesContractList({
      filter: {
        user: params.userId,
        archived: false,
        ...(params.protocolId ? { protocol: params.protocolId } : {}),
      },
    })

    return data
  }
)

export const scanWalletMetricFx = stakingAutomatesDomain.createEffect(
  (params: ScanWalletMetricParams) => {
    return walletApi.scanWalletMetric(params.walletId, params.contractId)
  }
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
    state.map((contract) =>
      contract.id === payload.contractId
        ? { ...contract, [LOAD_TYPES[payload.action]]: true }
        : contract
    )
  )
  .on(reset, (state) =>
    state.map((contract) =>
      omit(contract, ['migrating', 'depositing', 'refunding', 'running'])
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

export const StakingAutomatesGate = createGate<string | null>({
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
    clock: [authModel.$user.updates, StakingAutomatesGate.open, updated],
    filter: (source): source is [UserType, boolean, string] => {
      const [user, status] = source

      return Boolean(user?.id) && status
    },
  }),
  fn: ([user, , protocolId]) => ({ userId: user.id, protocolId }),
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

$automatesContracts.on(contractCreated, (state, payload) => [...state, payload])
$automatesContracts.reset(StakingAutomatesGate.close)
