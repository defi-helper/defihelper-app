import { createDomain, guard } from 'effector-logger'
import { throttle } from 'patronum/throttle'

import { NETWORKS, Network } from '~/wallets/common'
import { networkModel } from '~/wallets/wallet-networks'

const domain = createDomain('walletNetworkSwitcher')

export const activateNetwork = throttle({
  source: domain.createEvent<Network>('activateNetwork'),
  timeout: 1000
})

export const activateNetworkFx = domain.createEffect({
  name: 'activateNetworkFx',
  handler: (chainId: number) => {
    const nextNetwork = NETWORKS.find((network) =>
      network.chainIds?.includes(chainId)
    )

    if (!nextNetwork) return

    activateNetwork(nextNetwork)
  }
})

export const $currentNetwork = domain
  .createStore(NETWORKS[1], {
    name: '$currentNetwork'
  })
  .on(activateNetwork, (state, payload) => {
    return state.title === payload.title ? undefined : payload
  })

guard({
  clock: networkModel.activateWalletFx.doneData.map(({ chainId }) => chainId),
  filter: (chainId): chainId is number => Boolean(chainId),
  target: activateNetworkFx,
  greedy: true
})

guard({
  clock: networkModel.updateWalletFx.doneData.map(({ chainId }) => chainId),
  filter: (chainId): chainId is number => Boolean(chainId),
  target: activateNetworkFx,
  greedy: true
})
