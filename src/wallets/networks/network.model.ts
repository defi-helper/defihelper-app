import { AbstractConnector } from '@web3-react/abstract-connector'
import { ConnectorUpdate } from '@web3-react/types'
import { createDomain, guard } from 'effector-logger'
import { useStore } from 'effector-react'
import { useMemo } from 'react'

import { augmentConnectorUpdate, walletApi } from '~/wallets/common'
import { createEthereumProvider } from './ethereum'
import { notifications } from '~/notifications'
import { sidUtils } from '~/users/common/sid-utils'
import { config } from '~/config'

const networks = new Map<number | undefined, typeof createEthereumProvider>()

;[...config.CHAIN_BINANCE_IDS, ...config.CHAIN_ETHEREUM_IDS].forEach((num) =>
  networks.set(num, createEthereumProvider)
)

export const networkDomain = createDomain('network')

export const activateWalletFx = networkDomain.createEffect({
  name: 'activateWallet',
  handler: async (params: {
    connector: AbstractConnector
    update?: ConnectorUpdate<number>
  }) => {
    const updateData = await params.connector.activate()

    return augmentConnectorUpdate(params.connector, params.update ?? updateData)
  }
})

export const updateWalletFx = networkDomain.createEffect({
  name: 'updateWallet',
  handler: async (params: {
    connector: AbstractConnector
    update: ConnectorUpdate<number>
  }) => {
    return augmentConnectorUpdate(params.connector, params.update)
  }
})

export const diactivateWalletFx = networkDomain.createEffect(
  async (connector: AbstractConnector) => {
    connector.deactivate()
  }
)

export type WalletStore = ConnectorUpdate<number> & {
  connector?: AbstractConnector
}

const initalData = {
  chainId: undefined,
  account: null,
  provider: undefined,
  connector: undefined
}

export const $wallet = networkDomain
  .createStore<WalletStore>(initalData, { name: 'wallet' })
  .on(activateWalletFx.doneData, (_, payload) => payload)
  .on(updateWalletFx.doneData, (_, payload) => payload)
  .on(diactivateWalletFx.doneData, () => ({ ...initalData }))

export const getNetwork = () => {
  const wallet = $wallet.getState()

  const createProvider = networks.get(wallet.chainId)

  return {
    ...wallet,
    networkProvider: createProvider?.(wallet.provider)
  }
}

export const useNetworkProvider = () => {
  const wallet = useStore($wallet)

  return useMemo(() => {
    const createProvider = networks.get(wallet.chainId)

    return {
      ...wallet,
      networkProvider: createProvider?.(wallet.provider)
    }
  }, [wallet])
}

const MESSAGE = 'hello!'

export const signMessageFx = networkDomain.createEffect({
  name: 'signMessage',
  handler: async () => {
    const network = getNetwork()

    const signer = network.networkProvider?.getSigner()

    if (sidUtils.get()) return

    const signature = await signer?.signMessage(MESSAGE)

    if (!signature || !network.account) return

    const data = await walletApi.authEth({
      network: String(network.chainId),
      signature,
      message: MESSAGE,
      address: network.account
    })

    if (!data) return

    sidUtils.set(data.sid)

    return data.user
  }
})

signMessageFx.failData.watch((error) => notifications.error(error.message))

guard({
  clock: $wallet,
  target: signMessageFx,
  filter: ({ account }) => Boolean(account),
  greedy: true
})
