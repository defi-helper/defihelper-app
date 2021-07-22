import { guard, sample, createDomain, combine } from 'effector-logger'
import omit from 'lodash.omit'

import { bignumberUtils } from '~/common/bignumber-utils'
import {
  loadAdapter,
  AdapterActions,
  Adapter,
  AdapterWallet,
} from '~/common/load-adapter'
import { BlockchainEnum } from '~/graphql/_generated-types'
import { toastsService } from '~/toasts'
import { buildAdaptersUrl, stakingApi } from '~/staking/common'
import * as stakingListModel from '~/staking/staking-list/staking-list.model'
import { walletNetworkSwitcherModel } from '~/wallets/wallet-network-switcher'
import { networkModel } from '~/wallets/wallet-networks'

export type StakingAdapter = {
  wallet: null | AdapterWallet
  actions: null | AdapterActions
  contractAddress: string
  metrics: Adapter['metrics']
  staking: Adapter['staking']
  reward: Adapter['reward']
}

const stakingAdaptersDomain = createDomain('stakingAdaptersDomain')

type Contract = {
  address: string
  adapter: string
}

type Params = { protocolAdapter: string; contracts: Contract[] }

export const fetchContractAdaptersFx = stakingAdaptersDomain.createEffect({
  name: 'fetchContractAdaptersFx',
  handler: (params: Params) => {
    const network = networkModel.getNetwork()

    return Promise.all(
      params.contracts.map(async (contract) => {
        const adapterContract = await loadAdapter(
          buildAdaptersUrl(params.protocolAdapter),
          contract.adapter
        )

        const adapter = await adapterContract(
          network.networkProvider,
          contract.address,
          {
            blockNumber: 'latest',
            signer: network.networkProvider?.getSigner(),
          }
        )

        const wallet = network.account
          ? await adapter.wallet(network.account)
          : null

        const actions = network.account
          ? await adapter.actions(network.account)
          : null

        return {
          contractAddress: contract.address,
          wallet,
          metrics: adapter.metrics,
          staking: adapter.staking,
          reward: adapter.reward,
          actions,
        }
      })
    )
  },
})

const $adapters = stakingAdaptersDomain
  .createStore<StakingAdapter[]>([], { name: '$adapters' })
  .on(fetchContractAdaptersFx.doneData, (_, payload) => payload)

const fetchStakingListDone = sample({
  clock: stakingListModel.fetchStakingListFx.done,
  fn: ({ result }) => ({
    protocolAdapter: result.adapter,
    contracts: result.contracts.map(({ address, adapter }) => ({
      address,
      adapter,
    })),
  }),
  greedy: true,
})

sample({
  source: networkModel.$wallet,
  clock: guard({
    clock: fetchStakingListDone,
    filter: (params): params is Params => Boolean(params.protocolAdapter),
  }),
  fn: (source, clock) => ({ ...clock, provider: source.provider }),
  target: fetchContractAdaptersFx,
  greedy: true,
})

export const $contracts = combine($adapters, (adapters) => {
  return adapters.reduce((acc, adapter) => {
    acc.set(adapter.contractAddress, adapter)

    return acc
  }, new Map<string, StakingAdapter>())
})

export type ContractAction = {
  actions: AdapterActions
  action: keyof AdapterActions
  decimals: number
  amount: string
  contractAddress: string
}

const contractActionFx = stakingAdaptersDomain.createEffect({
  name: 'contractActionFx',
  handler: async (contractAction: ContractAction) => {
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
  },
})

export const contractAction =
  stakingAdaptersDomain.createEvent<Partial<ContractAction>>('contractAction')

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
  >(
    {},
    {
      name: '$actions',
    }
  )
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

const fetchTokensFx = stakingAdaptersDomain.createEffect({
  name: 'fetchTokensFx',
  handler: (params: {
    blockchain?: BlockchainEnum
    network?: number
    addresses: string[]
  }) => {
    return stakingApi.tokens({
      filter: {
        ...(params.blockchain
          ? {
              blockchain: {
                protocol: params.blockchain,
                ...(params.network ? { network: String(params.network) } : {}),
              },
            }
          : {}),
        address: params.addresses,
      },
    })
  },
})

export const $tokens = stakingAdaptersDomain
  .createStore<Record<string, string>>({}, { name: '$tokens' })
  .on(fetchTokensFx.doneData, (_, payload) =>
    payload.reduce<Record<string, string>>((acc, token) => {
      acc[token.address] = token.symbol

      return acc
    }, {})
  )

sample({
  source: walletNetworkSwitcherModel.$currentNetwork,
  clock: fetchContractAdaptersFx.doneData,
  fn: (source, clock) => ({
    blockchain: source.blockchain,
    network: source.network,
    addresses: [
      ...clock.reduce<string[]>((acc, { wallet }) => {
        acc.push(
          ...Object.keys(wallet?.earned ?? {}),
          ...Object.keys(wallet?.staked ?? {}),
          ...Object.keys(wallet?.tokens ?? {})
        )

        return acc
      }, []),
    ],
  }),
  target: fetchTokensFx,
  greedy: true,
})

toastsService.forwardErrors(
  contractActionFx.failData,
  fetchContractAdaptersFx.failData
)
