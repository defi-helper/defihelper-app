import { createDomain, guard, sample } from 'effector-logger/macro'
import type { AbstractConnector } from '@web3-react/abstract-connector'
import { shallowEqual } from 'fast-equals'

import { isWavesAddress } from '~/common/is-waves-address'
import { NETWORKS, Network, connectors } from '~/wallets/common'
import { walletNetworkModel } from '~/wallets/wallet-networks'

const domain = createDomain('walletNetworkSwitcher')

export const activateNetwork = domain.createEvent<Network>('activateNetwork')

export const activateNetworkFx = domain.createEffect({
  name: 'activateNetworkFx',
  handler: (chainId: number | string) => {
    const nextNetwork = NETWORKS.find(({ network }) => network === chainId)

    if (!nextNetwork) return

    activateNetwork(nextNetwork)
  },
})

export const $currentNetwork = domain
  .createStore(NETWORKS[1], {
    name: '$currentNetwork',
  })
  .on(activateNetwork, (state, payload) =>
    shallowEqual(state, payload) ? undefined : payload
  )

guard({
  clock: walletNetworkModel.activateWalletFx.doneData.map(
    ({ chainId }) => chainId
  ),
  filter: (chainId): chainId is number | string => Boolean(chainId),
  target: activateNetworkFx,
  greedy: true,
})

guard({
  clock: walletNetworkModel.updateWalletFx.doneData.map(
    ({ chainId }) => chainId
  ),
  filter: (chainId): chainId is number | string => Boolean(chainId),
  target: activateNetworkFx,
  greedy: true,
})

const activateEthereumFx = domain.createEffect({
  name: 'activateEthereumFx',
  handler: async (params: {
    account: null | string
    connector: AbstractConnector
    fn: () => Promise<unknown>
  }) => {
    if (!params.account || (params.account && isWavesAddress(params.account))) {
      return walletNetworkModel.activateWalletFx({
        connector: params.connector,
      })
    }

    await params.fn()

    return walletNetworkModel.activateWalletFx({ connector: params.connector })
  },
})

const activateWavesFx = domain.createEffect({
  name: 'activateWavesFx',
  handler: (connector: AbstractConnector) =>
    walletNetworkModel.activateWalletFx({ connector }),
})

export const activateWaves = domain.createEvent('activateWaves')

export const activateEthereum =
  domain.createEvent<() => Promise<unknown>>('activateEthereum')

sample({
  source: walletNetworkModel.$wallet,
  clock: activateWaves,
  fn: () => connectors.wavesKepper,
  target: activateWavesFx,
})

sample({
  source: walletNetworkModel.$wallet,
  clock: activateEthereum,
  fn: ({ account = null }, clock) => ({
    account,
    connector: connectors.injected,
    fn: clock,
  }),
  target: activateEthereumFx,
})
