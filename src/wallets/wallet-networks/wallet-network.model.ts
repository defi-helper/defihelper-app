import { AbstractConnector } from '@web3-react/abstract-connector'
import { ConnectorUpdate } from '@web3-react/types'
import { createDomain, guard, sample, split } from 'effector-logger'
import { useStore } from 'effector-react'
import { useMemo } from 'react'
import { shallowEqual } from 'fast-equals'

import {
  augmentConnectorUpdate,
  walletApi,
  createEthereumProvider,
  connectors,
  signMessageWaves,
  signMessageEthereum,
  SIGN_MESSAGE,
} from '~/wallets/common'
import { toastsService } from '~/toasts'
import { sidUtils } from '~/users/common'
import { config } from '~/config'
import { UserType } from '~/graphql/_generated-types'

const networks = new Map<
  number | undefined | string,
  typeof createEthereumProvider
>(
  [
    ...config.CHAIN_BINANCE_IDS,
    ...config.CHAIN_ETHEREUM_IDS,
    ...config.CHAIN_POLYGON_IDS,
  ].map((num) => [num, createEthereumProvider])
)

type AuthData = {
  sid: string
  user: Omit<
    UserType,
    'billing' | 'locale' | 'blockchains' | 'metricChart' | 'tokenMetricChart'
  >
}

export const networkDomain = createDomain('network')

export const activateWalletFx = networkDomain.createEffect({
  name: 'activateWallet',
  handler: async (params: {
    connector: AbstractConnector
    update?: ConnectorUpdate<number | string>
  }) => {
    const updateData = await params.connector.activate()

    return augmentConnectorUpdate(params.connector, params.update ?? updateData)
  },
})

export const updateWalletFx = networkDomain.createEffect({
  name: 'updateWallet',
  handler: async (params: {
    connector: AbstractConnector
    update: ConnectorUpdate<number | string>
  }) => {
    return augmentConnectorUpdate(params.connector, params.update)
  },
})

export type WalletStore = ConnectorUpdate<number | string> & {
  connector?: AbstractConnector
}

export const diactivateWalletFx = networkDomain.createEffect({
  name: 'diactivateWalletFx',
  handler: async (connector?: AbstractConnector) => {
    connector?.deactivate()
  },
})

export const $wallet = networkDomain
  .createStore<WalletStore>(
    {
      chainId: config.CHAIN_ETHEREUM_IDS[0],
      account: null,
      provider: null,
      connector: connectors.injected,
    },
    {
      name: '$wallet',
    }
  )
  .on(activateWalletFx.doneData, (state, payload) => {
    return shallowEqual(state, payload) ? undefined : payload
  })
  .on(updateWalletFx.doneData, (state, payload) => {
    return shallowEqual(state, payload) ? undefined : payload
  })
  .reset(diactivateWalletFx.done)

export const getNetwork = () => {
  const wallet = $wallet.getState()

  const createProvider = networks.get(wallet.chainId)

  return {
    ...wallet,
    networkProvider: createProvider?.(wallet.provider),
  }
}

export const useWalletNetwork = () => {
  const wallet = useStore($wallet)

  return useMemo(() => wallet, [wallet])
}

export const signMessageWavesFx = networkDomain.createEffect({
  name: 'signMessageWavesFx',
  handler: async (params: { provider: unknown; account: string }) => {
    const signedMessageData = await signMessageWaves(
      params.provider,
      params.account,
      SIGN_MESSAGE
    )

    return walletApi.authWaves(signedMessageData)
  },
})

export const signMessageEthereumFx = networkDomain.createEffect({
  name: 'signMessageEthereumFx',
  handler: async (params: {
    chainId: string | number
    account: string
    provider: unknown
  }) => {
    const signedMessageData = await signMessageEthereum(
      createEthereumProvider(params.provider),
      params.account,
      SIGN_MESSAGE
    )

    return walletApi.authEth({
      network: String(params.chainId),
      ...signedMessageData,
    })
  },
})

export const saveUserFx = networkDomain.createEffect({
  name: 'saveUserFx',
  handler: async (data: AuthData) => {
    sidUtils.set(data.sid)

    return data.user
  },
})

guard({
  clock: signMessageEthereumFx.doneData,
  filter: (clock): clock is AuthData => Boolean(clock),
  target: saveUserFx,
})

guard({
  clock: signMessageWavesFx.doneData,
  filter: (clock): clock is AuthData => Boolean(clock),
  target: saveUserFx,
})

export const signMessageFx = networkDomain.createEffect({
  name: 'signMessageFx',
  handler: getNetwork,
})

sample({
  source: $wallet.map(({ connector }) => connector),
  clock: [signMessageEthereumFx.fail, signMessageWavesFx.fail],
  target: diactivateWalletFx,
  greedy: true,
})

guard({
  clock: $wallet,
  target: signMessageFx,
  filter: ({ account }) => Boolean(account) && !sidUtils.get(),
  greedy: true,
})

split({
  source: signMessageFx.doneData,
  match: {
    waves: ({ chainId, provider }) => chainId === 'waves' && Boolean(provider),
    ethereum: ({ chainId, provider }) =>
      typeof chainId === 'number' && Boolean(provider),
  },
  cases: {
    waves: signMessageWavesFx,
    ethereum: signMessageEthereumFx,
  },
})

toastsService.forwardErrors(
  signMessageEthereumFx.failData,
  signMessageWavesFx.failData,
  signMessageFx.failData,
  diactivateWalletFx.failData,
  updateWalletFx.failData,
  activateWalletFx.failData
)
