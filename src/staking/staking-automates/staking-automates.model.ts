import { createDomain, sample, restore, guard } from 'effector-logger/macro'
import { createGate } from 'effector-react'
import omit from 'lodash.omit'
import { authModel } from '~/auth'
import { bignumberUtils } from '~/common/bignumber-utils'

import { loadAdapter } from '~/common/load-adapter'
import { UserType } from '~/graphql/_generated-types'
import { protocolsApi } from '~/protocols/common'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import * as deployModel from '~/automations/automation-deploy-contract/automation-deploy-contract.model'
import {
  buildAdaptersUrl,
  stakingApi,
  StakingAutomatesContract,
} from '../common'
import { config } from '~/config'

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

type FetchAutomatesParams = {
  userId: string
  protocolId?: string
}

const LOAD_TYPES: Record<ActionType, 'migrating' | 'depositing' | 'refunding'> =
  {
    migrate: 'migrating',
    deposit: 'depositing',
    refund: 'refunding',
  }

export const stakingAutomatesDomain = createDomain()

export const fetchAutomatesContractsFx = stakingAutomatesDomain.createEffect(
  async (params: FetchAutomatesParams) => {
    const data = await stakingApi.automatesContractList({
      filter: {
        user: params.userId,
        ...(params.protocolId ? { protocol: params.protocolId } : {}),
      },
    })

    const automatesWithAutostaking = data.list.map(async (automateContract) => {
      const result = await protocolsApi.earnings({
        balance:
          Number(automateContract.contractWallet?.metric.stakedUSD) ||
          config.FIX_SUM,
        apy: Number(automateContract.contract?.metric.aprYear),
        network: automateContract.wallet.network,
        blockchain: automateContract.wallet.blockchain,
      })

      const [lastAutostakingValue] = result?.optimal.slice(-1) ?? []

      const autostakingApy = bignumberUtils.mul(
        bignumberUtils.div(
          bignumberUtils.minus(
            lastAutostakingValue?.v,
            Number(automateContract.contract?.metric.myStaked) || config.FIX_SUM
          ),
          Number(automateContract.contract?.metric.myStaked) || config.FIX_SUM
        ),
        100
      )

      return {
        ...automateContract,
        autostaking: bignumberUtils.minus(
          autostakingApy,
          automateContract.contract?.metric.aprYear
        ),
      }
    })

    return {
      ...data,
      list: await Promise.all(automatesWithAutostaking),
    }
  }
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

export const StakingAutomatesGate = createGate<string | null>({
  name: 'StakingAutomatesGate',
  domain: stakingAutomatesDomain,
  defaultState: null,
})

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
      deployModel.deployFx.doneData,
    ],
    filter: (source): source is [UserType, boolean, string] => {
      const [user, status] = source

      return Boolean(user?.id) && status
    },
  }),
  fn: ([user, , protocolId]) => ({ userId: user.id, protocolId }),
  target: fetchAutomatesContractsFx,
})

$adapter.reset(StakingAutomatesGate.close, reset)
$action.reset(StakingAutomatesGate.close, reset)
