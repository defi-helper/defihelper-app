import { createDomain, guard } from 'effector-logger'
import { debounce } from 'patronum/debounce'

import { NETWORKS, Network } from '~/wallets/common'
import { networkModel } from '~/wallets/wallet-networks'

const domain = createDomain('walletNetworkSwitcher')

export const activateNetwork = debounce({
  source: domain.createEvent<Network>('activateNetwork'),
  timeout: 300
})

export const activateNetworkFx = domain.createEffect({
  name: 'activateNetworkFx',
  handler: (chainId: number | string) => {
    const nextNetwork = NETWORKS.find((network) =>
      network.chainIds.includes(chainId)
    )

    if (!nextNetwork) return

    activateNetwork(nextNetwork)
  }
})

export const $currentNetwork = domain
  .createStore(NETWORKS[1], {
    name: '$currentNetwork'
  })
  .on(activateNetwork, (_, payload) => payload)

guard({
  clock: networkModel.activateWalletFx.doneData.map(({ chainId }) => chainId),
  filter: (chainId): chainId is number | string => Boolean(chainId),
  target: activateNetworkFx,
  greedy: true
})

guard({
  clock: networkModel.updateWalletFx.doneData.map(({ chainId }) => chainId),
  filter: (chainId): chainId is number | string => Boolean(chainId),
  target: activateNetworkFx,
  greedy: true
})
