import { AbstractConnector } from '@web3-react/abstract-connector'
import { ConnectorUpdate } from '@web3-react/types'
import { createDomain } from 'effector-logger'

import { augmentConnectorUpdate } from '~/wallets/common'

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

export const $wallet = networkDomain
  .createStore<WalletStore>(
    {
      chainId: undefined,
      account: null,
      provider: undefined,
      connector: undefined
    },
    { name: 'wallet' }
  )
  .on(activateWalletFx.doneData, (_, walletData) => walletData)
  .on(updateWalletFx.doneData, (_, walletData) => walletData)
