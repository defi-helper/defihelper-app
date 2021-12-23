import { AbstractConnector } from '@web3-react/abstract-connector'
import { ConnectorUpdate } from '@web3-react/types'
import { createDomain, guard, sample } from 'effector-logger/macro'
import { useStore } from 'effector-react'
import { useMemo } from 'react'
import { shallowEqual } from 'fast-equals'

import {
  augmentConnectorUpdate,
  walletApi,
  createEthereumProvider,
  signMessageWaves,
  signMessageEthereum,
  SIGN_MESSAGE,
} from '~/wallets/common'
import { toastsService } from '~/toasts'
import { sidUtils } from '~/auth/common'
import { config } from '~/config'
import { BlockchainEnum } from '~/graphql/_generated-types'
import { networksConfig } from '~/networks-config'

const networks = new Map<string, typeof createEthereumProvider>(
  Object.values(networksConfig)
    .filter(({ blockchain }) => blockchain === BlockchainEnum.Ethereum)
    .map(({ chainId }) => [String(chainId), createEthereumProvider])
)

export const networkDomain = createDomain('network')

export const activateWalletFx = networkDomain.createEffect(
  async (params: {
    connector: AbstractConnector
    update?: ConnectorUpdate<number | string>
  }) => {
    const updateData = await params.connector.activate()

    return augmentConnectorUpdate(params.connector, params.update ?? updateData)
  }
)

export const updateWalletFx = networkDomain.createEffect(
  async (params: {
    connector: AbstractConnector
    update: ConnectorUpdate<number | string>
  }) => {
    return augmentConnectorUpdate(params.connector, params.update)
  }
)

export type WalletStore = ConnectorUpdate<number | string> & {
  connector?: AbstractConnector
}

export const diactivateWalletFx = networkDomain.createEffect(
  async (connector?: AbstractConnector) => {
    connector?.deactivate()

    sidUtils.remove()
  }
)

export const $wallet = networkDomain
  .createStore<WalletStore>({
    chainId: config.DEFAULT_CHAIN_ID,
    account: null,
    provider: null,
    connector: undefined,
  })
  .on(activateWalletFx.doneData, (state, payload) => {
    return shallowEqual(state, payload) ? undefined : payload
  })
  .on(updateWalletFx.doneData, (state, payload) => {
    return shallowEqual(state, payload) ? undefined : payload
  })
  .reset(diactivateWalletFx.done)

export const getNetwork = (provider: unknown, chainId?: string | number) => {
  const createProvider = networks.get(String(chainId))

  return createProvider?.(provider) ?? null
}

export const useWalletNetwork = () => {
  const wallet = useStore($wallet)

  return useMemo(() => wallet, [wallet])
}

export const signMessageWavesFx = networkDomain.createEffect(
  async (params: { provider: unknown; account: string }) => {
    const signedMessageData = await signMessageWaves(
      params.provider,
      params.account,
      SIGN_MESSAGE
    )

    const data = await walletApi.authWaves(signedMessageData)

    if (!data) {
      throw new Error('Unable to authenticate')
    }

    return data
  }
)

export const signMessageEthereumFx = networkDomain.createEffect(
  async (params: {
    chainId: string | number
    account: string
    provider: unknown
  }) => {
    const signedMessageData = await signMessageEthereum(
      createEthereumProvider(params.provider),
      params.account,
      SIGN_MESSAGE
    )

    const data = await walletApi.authEth({
      network: String(params.chainId),
      ...signedMessageData,
    })

    if (!data) throw new Error('Unable to authenticate')

    return data
  }
)

export const signMessage = networkDomain.createEvent<{
  chainId: string
  provider: unknown
  account: string
}>()

sample({
  source: $wallet.map(({ connector }) => connector),
  clock: [signMessageEthereumFx.fail, signMessageWavesFx.fail],
  target: diactivateWalletFx,
})

sample({
  clock: guard({
    clock: activateWalletFx.doneData,
    filter: (
      clock
    ): clock is {
      chainId: string | number
      account: string
      provider: unknown
      connector: AbstractConnector
    } => Boolean(clock.account) && Boolean(clock.chainId),
  }),
  fn: ({ account, chainId, provider }) => ({
    account,
    chainId: String(chainId),
    provider,
  }),
  target: signMessage,
})

toastsService.forwardErrors(
  signMessageEthereumFx.failData,
  signMessageWavesFx.failData,
  diactivateWalletFx.failData,
  updateWalletFx.failData,
  activateWalletFx.failData
)
