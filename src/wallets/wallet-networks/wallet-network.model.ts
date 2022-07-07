import { AbstractConnector } from '@web3-react/abstract-connector'
import { ConnectorUpdate } from '@web3-react/types'
import { createStore, createEffect, guard, sample } from 'effector'
import { useStore } from 'effector-react'
import { useMemo } from 'react'
import { debounce } from 'patronum/debounce'

import {
  augmentConnectorUpdate,
  createEthereumProvider,
  signMessageWaves,
  signMessageEthereum,
  SIGN_MESSAGE,
  connectorsByName,
  Wallet,
} from '~/wallets/common'
import { toastsService } from '~/toasts'
import { BlockchainEnum } from '~/api/_generated-types'
import { networksConfig } from '~/networks-config'
import type { WavesKeeperConnector } from '~/wallets/common/waves-keeper-connector'

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

export const activateWalletFx = createEffect(
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

const saveLastConnectorFx = createEffect((connector: string) => {
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

export const updateWalletFx = createEffect(
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

export const diactivateWalletFx = createEffect(
  async (connector?: AbstractConnector) => {
    connector?.deactivate()
  }
)

const activated = debounce({ source: activateWalletFx.doneData, timeout: 500 })
const updated = debounce({ source: updateWalletFx.doneData, timeout: 500 })

export const $wallet = createStore<Wallet | null>(null)
  .on(activated, (_, payload) => payload)
  .on(updated, (_, payload) => payload)
  .reset(diactivateWalletFx)

export const getNetwork = (provider: unknown, chainId?: string | number) => {
  const createProvider = networks.get(String(chainId))

  return createProvider?.(provider) ?? null
}

export const useWalletNetwork = () => {
  const wallet = useStore($wallet)

  return useMemo(() => wallet, [wallet])
}

export const signMessageWavesFx = createEffect(
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

export const signMessageEthereumFx = createEffect(
  async (params: SignMessageEthereum) => {
    const signedMessageData = await signMessageEthereum(
      createEthereumProvider(params.provider),
      params.account,
      SIGN_MESSAGE
    )

    return { ...params, ...signedMessageData }
  }
)

sample({
  source: $wallet.map((wallet) => wallet?.connector),
  clock: [signMessageEthereumFx.fail, signMessageWavesFx.fail],
  target: diactivateWalletFx,
})

toastsService.forwardErrors(
  signMessageEthereumFx.failData,
  signMessageWavesFx.failData,
  diactivateWalletFx.failData,
  updateWalletFx.failData,
  activateWalletFx.failData
)
