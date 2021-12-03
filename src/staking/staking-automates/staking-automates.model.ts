import { createDomain, sample, restore } from 'effector-logger/macro'
import { createGate } from 'effector-react'
import omit from 'lodash.omit'

import { loadAdapter } from '~/common/load-adapter'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { automationApi } from '../../automations/common/automation.api'
import {
  buildAdaptersUrl,
  stakingApi,
  StakingAutomatesContract,
} from '../common'

export type ActionType = 'deposit' | 'migrate' | 'refund'

type FetchAdapterParams = {
  protocolAdapter: string
  contractAdapter: string
  contractAddress: string
  provider: unknown
  chainId: string
  action: ActionType
  contractId: string
}

const LOAD_TYPES: Record<ActionType, 'migrating' | 'depositing' | 'refunding'> =
  {
    migrate: 'migrating',
    deposit: 'depositing',
    refund: 'refunding',
  }

export const stakingAutomatesDomain = createDomain()

export const fetchAutomatesContractsFx = stakingAutomatesDomain.createEffect(
  stakingApi.automatesContractList
)

export const fetchAdapter = stakingAutomatesDomain.createEffect(
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

export const deleteContractFx = stakingAutomatesDomain.createEffect(
  (contractId: string) => automationApi.deleteContract({ id: contractId })
)

export const renameContractFx = stakingAutomatesDomain.createEffect(() => {})

export const reset = stakingAutomatesDomain.createEvent()

export const $adapter = restore(fetchAdapter.doneData, null)
export const $action = restore(
  fetchAdapter.done.map(({ params }) => params.action),
  null
)

export const $automatesContracts = stakingAutomatesDomain
  .createStore<StakingAutomatesContract[]>([])
  .on(fetchAutomatesContractsFx.doneData, (_, { list }) => list)
  .on(fetchAdapter, (state, payload) =>
    state.map((contract) =>
      contract.id === payload.contractId
        ? { ...contract, [LOAD_TYPES[payload.action]]: true }
        : contract
    )
  )
  .on(reset, (state) =>
    state.map((contract) =>
      omit(contract, ['migrating', 'depositing', 'refunding'])
    )
  )
  .on(deleteContractFx, (state, payload) =>
    state.map((contract) =>
      contract.id === payload ? { ...contract, deleting: true } : contract
    )
  )
  .on(deleteContractFx.finally, (state, { params }) =>
    state.map((contract) =>
      contract.id === params ? { ...contract, deleting: false } : contract
    )
  )

export const StakingAutomatesGate = createGate({
  name: 'StakingAutomatesGate',
  domain: stakingAutomatesDomain,
})

sample({
  clock: StakingAutomatesGate.open,
  target: fetchAutomatesContractsFx,
})

$adapter.reset(StakingAutomatesGate.close, reset)
$action.reset(StakingAutomatesGate.close, reset)
