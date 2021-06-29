import { createEffect, guard } from 'effector'
import { useStore } from 'effector-react'
import { useMemo } from 'react'

import { config } from '~/config'
import { notifications } from '~/notifications'
import { sidUtils } from '~/common/sid-utils'
import { walletApi } from '~/wallets/common'
import { createEthereumProvider } from './ethereum'
import { $wallet, networkDomain, WalletStore } from './network.model'

export * from './hooks'

const networks = new Map<number | undefined, typeof createEthereumProvider>()

;[...config.CHAIN_BINANCE_IDS, ...config.CHAIN_ETHEREUM_IDS].forEach((num) =>
  networks.set(num, createEthereumProvider)
)

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

export const signMessageFx = createEffect({
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

const updated = networkDomain.createEvent<WalletStore>('updated')

guard({
  clock: [updated],
  source: $wallet,
  target: signMessageFx,
  filter: ({ account }) => Boolean(account),
  greedy: true
})

$wallet.watch(updated)
