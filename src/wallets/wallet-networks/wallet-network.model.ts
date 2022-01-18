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
import { BlockchainEnum } from '~/graphql/_generated-types'
import { networksConfig } from '~/networks-config'

export type SignMessageEthereum = {
  chainId: string
  account: string
  provider: unknown
}

export type SignMessageWaves = {
  provider: unknown
  account: string
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

    sidUtils.remove()
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

    return { ...params, ...signedMessageData }
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
}>()

sample({
  source: $wallet.map((wallet) => wallet?.connector),
  clock: [signMessageEthereumFx.fail, signMessageWavesFx.fail],
  target: diactivateWalletFx,
})

guard({
  clock: activateWalletFx.doneData.map(({ account, chainId, provider }) => ({
    account,
    chainId,
    provider,
  })),
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
