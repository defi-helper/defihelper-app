import { guard, sample, createDomain, combine } from 'effector-logger/macro'
import omit from 'lodash.omit'

import { bignumberUtils } from '~/common/bignumber-utils'
import {
  loadAdapter,
  AdapterActions,
  Adapter,
  AdapterWallet,
} from '~/common/load-adapter'
import { toastsService } from '~/toasts'
import { buildAdaptersUrl, stakingApi } from '~/staking/common'
import { walletNetworkModel } from '~/wallets/wallet-networks'

export type StakingAdapter = {
  wallet: null | AdapterWallet
  actions: null | AdapterActions
  contractAddress: string
  metrics: Adapter['metrics']
  staking: Adapter['staking']
  reward: Adapter['reward']
}

export const stakingAdaptersDomain = createDomain()

export type Contract = {
  address: string
  adapter: string
}

type Params = {
  protocolAdapter: string
  contracts: Contract[]
  provider: unknown
  account: string
  chainId: string
}

export const fetchContractAdaptersFx = stakingAdaptersDomain.createEffect(
  (params: Params) => {
    const networkProvider = walletNetworkModel.getNetwork(
      params.provider,
      params.chainId
    )

    return Promise.all(
      params.contracts.map(async (contract) => {
        const adapterContract = await loadAdapter(
          buildAdaptersUrl(params.protocolAdapter),
          contract.adapter
        )

        const adapter = await adapterContract(
          networkProvider,
          contract.address,
          {
            blockNumber: 'latest',
            signer: networkProvider?.getSigner(),
          }
        )

        const wallet = params.account
          ? await adapter.wallet(params.account)
          : null

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
      })
    )
  }
)

const $adapters = stakingAdaptersDomain
  .createStore<StakingAdapter[]>([], { name: '$adapters' })
  .on(fetchContractAdaptersFx.doneData, (_, payload) => payload)

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

const contractActionFx = stakingAdaptersDomain.createEffect(
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

const fetchTokensFx = stakingAdaptersDomain.createEffect(
  (params: { addresses: string[] }) => {
    return stakingApi.tokens({
      filter: {
        address: params.addresses,
      },
    })
  }
)

export const $tokens = stakingAdaptersDomain
  .createStore<Record<string, string>>({})
  .on(fetchTokensFx.doneData, (_, payload) =>
    payload.reduce<Record<string, string>>((acc, token) => {
      acc[token.address] = token.symbol

      return acc
    }, {})
  )

sample({
  clock: fetchContractAdaptersFx.doneData,
  fn: (clock) => ({
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
