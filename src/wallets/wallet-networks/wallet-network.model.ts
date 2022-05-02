import { AbstractConnector } from '@web3-react/abstract-connector'
import { ConnectorUpdate } from '@web3-react/types'
import { createDomain, guard, sample } from 'effector-logger/macro'
import { useStore } from 'effector-react'
import { useMemo } from 'react'
import { shallowEqual } from 'fast-equals'

import {
  augmentConnectorUpdate,
  createEthereumProvider,
  signMessageWaves,
  signMessageEthereum,
  SIGN_MESSAGE,
  connectorsByName,
  Wallet,
  SignMessagePayload,
} from '~/wallets/common'
import { toastsService } from '~/toasts'
import { sidUtils } from '~/auth/common'
import { BlockchainEnum } from '~/api/_generated-types'
import { networksConfig } from '~/networks-config'
import type { WavesKeeperConnector } from '../common/waves-keeper-connector'

export type SignMessageEthereum = {
  chainId: string
  account: string
  provider: unknown
}

export type SignMessageWaves = {
  provider: unknown
  account: string
  connector: WavesKeeperConnector
}

const networks = new Map<string, typeof createEthereumProvider>(
  Object.values(networksConfig)
    .filter(({ blockchain }) => blockchain === BlockchainEnum.Ethereum)
    .map(({ chainId }) => [String(chainId), createEthereumProvider])
)

export const networkDomain = createDomain()

export const activateWalletFx = networkDomain.createEffect(
  async (params: {
    connector: AbstractConnector
    update?: ConnectorUpdate<string>
  }) => {
    const updateData = await params.connector.activate()

    const data = params.update ?? updateData

    const blockchain =
      Object.values(connectorsByName).find(
        ({ connector }) => connector === params.connector
      )?.blockchain ?? null

    return {
      ...(await augmentConnectorUpdate(params.connector, {
        ...data,
        chainId: String(data.chainId),
      })),
      blockchain,
    }
  }
)

const saveLastConnectorFx = networkDomain.createEffect((connector: string) => {
  localStorage.connector = connector
})

guard({
  clock: sample({
    clock: activateWalletFx,
    fn: (clock) => {
      const connectorName = Object.entries(connectorsByName).find(
        ([, { connector }]) => connector === clock.connector
      )

      return connectorName?.[0]
    },
  }),
  filter: (clock): clock is string => typeof clock === 'string',
  target: saveLastConnectorFx,
})

export const updateWalletFx = networkDomain.createEffect(
  async (params: {
    connector: AbstractConnector
    update: ConnectorUpdate<string>
  }) => {
    const blockchain =
      Object.values(connectorsByName).find(
        ({ connector }) => connector === params.connector
      )?.blockchain ?? null

    return {
      ...(await augmentConnectorUpdate(params.connector, params.update)),
      blockchain,
    }
  }
)

export const diactivateWalletFx = networkDomain.createEffect(
  async (connector?: AbstractConnector) => {
    connector?.deactivate()
  }
)

export const $wallet = networkDomain
  .createStore<Wallet | null>(null)
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
  async (params: SignMessageWaves) => {
    const signedMessageData = await signMessageWaves(
      params.provider,
      params.account,
      SIGN_MESSAGE
    )

    if (!params.connector.publicKey) throw new Error('publicKey is null')

    return {
      ...params,
      ...signedMessageData,
      publicKey: params.connector.publicKey,
    }
  }
)

export const signMessageEthereumFx = networkDomain.createEffect(
  async (params: SignMessageEthereum) => {
    const signedMessageData = await signMessageEthereum(
      createEthereumProvider(params.provider),
      params.account,
      SIGN_MESSAGE
    )

    return { ...params, ...signedMessageData }
  }
)

export const signMessage = networkDomain.createEvent<{
  chainId: string
  provider: unknown
  account: string
  connector: AbstractConnector
}>()

sample({
  source: $wallet.map((wallet) => wallet?.connector),
  clock: [signMessageEthereumFx.fail, signMessageWavesFx.fail],
  target: diactivateWalletFx,
})

guard({
  clock: activateWalletFx.doneData.map(
    ({ account, chainId, provider, connector }) => ({
      account,
      chainId,
      provider,
      connector,
    })
  ),
  filter: (clock): clock is SignMessagePayload =>
    Boolean(clock.account && clock.chainId) && !sidUtils.get(),
  target: signMessage,
})

toastsService.forwardErrors(
  signMessageEthereumFx.failData,
  signMessageWavesFx.failData,
  diactivateWalletFx.failData,
  updateWalletFx.failData,
  activateWalletFx.failData
)
