import { guard, createDomain } from 'effector-logger/macro'
import omit from 'lodash.omit'
import type { AbstractConnector } from '@web3-react/abstract-connector'
import { createGate } from 'effector-react'

import { bignumberUtils } from '~/common/bignumber-utils'
import {
  loadAdapter,
  AdapterActions,
  Adapter,
  AdapterWallet,
  isStaking,
} from '~/common/load-adapter'
import { toastsService } from '~/toasts'
import { buildAdaptersUrl, stakingApi } from '~/staking/common'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { parseError } from '~/common/parse-error'

export type StakingAdapter = {
  wallet: null | AdapterWallet
  actions: null | AdapterActions
  contractAddress: string
  metrics: Adapter['metrics']
  staking: Adapter['staking']
  reward: Adapter['reward']
}

export type Contract = {
  address: string
  adapter: string
}

type Params = {
  protocolAdapter: string
  contract: Contract
  provider: unknown
  account: string
  chainId: string
}

export type ContractAction = {
  actions: AdapterActions
  action: keyof AdapterActions
  decimals: number
  amount: string
  contractAddress: string
  contractId: string
  wallet: {
    connector: AbstractConnector
    provider: unknown
    chainId: string
    account: string
  }
}

export const stakingAdaptersDomain = createDomain()

export const fetchContractAdapterFx = stakingAdaptersDomain.createEffect(
  async (params: Params) => {
    const networkProvider = walletNetworkModel.getNetwork(
      params.provider,
      params.chainId
    )

    const { contract } = params

    const adapterObj = await loadAdapter(
      buildAdaptersUrl(params.protocolAdapter)
    )

    if (!isStaking(contract.adapter, Object.keys(adapterObj))) {
      throw new Error('something went wrong')
    }

    const adapterContract = adapterObj[contract.adapter]

    const adapter = await adapterContract(networkProvider, contract.address, {
      blockNumber: 'latest',
      signer: networkProvider?.getSigner(),
    })

    const wallet = params.account ? await adapter.wallet(params.account) : null

    const actions = params.account
      ? await adapter.actions(params.account)
      : null

    return {
      contractAddress: contract.address,
      wallet,
      metrics: adapter.metrics,
      staking: adapter.staking,
      reward: adapter.reward,
      actions,
    }
  }
)

export const $contract = stakingAdaptersDomain
  .createStore<StakingAdapter | null>(null)
  .on(fetchContractAdapterFx.doneData, (_, payload) => payload)

export const contractActionFx = stakingAdaptersDomain.createEffect(
  async (contractAction: ContractAction) => {
    const sendAmount = bignumberUtils.toSend(
      contractAction.amount,
      contractAction.decimals
    )

    const can = await contractAction.actions[contractAction.action].can(
      sendAmount
    )

    if (can instanceof Error) {
      throw can
    }

    if (!can) {
      throw new Error('something went wrong')
    }

    await contractAction.actions[contractAction.action].send(sendAmount)
  }
)

export const contractAction =
  stakingAdaptersDomain.createEvent<Partial<ContractAction>>()

guard({
  clock: contractAction,
  filter: (contractActionPayload): contractActionPayload is ContractAction => {
    if (
      contractActionPayload.action === 'claim' ||
      contractActionPayload.action === 'exit'
    ) {
      return Boolean(
        contractActionPayload.actions &&
          contractActionPayload.action &&
          contractActionPayload.decimals &&
          contractActionPayload.contractAddress
      )
    }
    return Boolean(
      contractActionPayload.actions &&
        contractActionPayload.action &&
        contractActionPayload.decimals &&
        contractActionPayload.amount &&
        contractActionPayload.contractAddress
    )
  },
  target: contractActionFx,
})

export const $actions = stakingAdaptersDomain
  .createStore<
    Record<
      string,
      {
        disabled: boolean
        [key: string]: boolean
      }
    >
  >({})
  .on(contractActionFx, (state, payload) => {
    const newState = { ...state }

    newState[payload.contractAddress] = {
      ...newState[payload.contractAddress],
      disabled: true,
      [payload.action]: true,
    }

    return newState
  })
  .on(contractActionFx.done, (state, { params }) => {
    const newState = { ...state }

    newState[params.contractAddress] = {
      ...newState[params.contractAddress],
      disabled: false,
      [params.action]: false,
    }

    return newState
  })
  .on(contractActionFx.fail, (state, { params }) =>
    omit({ ...state }, params.contractAddress)
  )

export const fetchTokensFx = stakingAdaptersDomain.createEffect(
  async (params: { addresses: string[] }) => {
    const data = await stakingApi.tokens({
      filter: {
        address: params.addresses,
      },
    })

    const tokens = data.reduce<Record<string, string>>((acc, token) => {
      acc[token.address] = token.symbol

      return acc
    }, {})

    return tokens
  }
)

export const StakingAdaptersGate = createGate({
  name: 'StakingAdaptersGate',
  domain: stakingAdaptersDomain,
})

$actions.reset(StakingAdaptersGate.close)
$contract.reset(StakingAdaptersGate.close)

toastsService.forwardErrors(
  contractActionFx.failData.map((error) => parseError(error)),
  fetchContractAdapterFx.failData.map((error) => parseError(error)),
  fetchTokensFx.failData
)
