import { createDomain, guard, sample } from 'effector-logger'
import { createGate } from 'effector-react'

import {
  BlockchainEnum,
  ProtocolFragmentFragment
} from '~/graphql/_generated-types'
import { protocolsApi } from '~/protocols/common'
import { userModel } from '~/users'
import { walletNetworkSwitcherModel } from '~/wallets/wallet-network-switcher'

const protocolListDomain = createDomain('protocolList')

export const fetchProtocolListFx = protocolListDomain.createEffect({
  name: 'fetchProtocolListFx',
  handler: (params?: {
    blockchain: BlockchainEnum
    network?: string | number
  }) =>
    protocolsApi.protocolList({
      ...(params?.blockchain
        ? {
            protocolFilter: {
              blockchain: {
                protocol: params.blockchain,
                network: params.network ? String(params.network) : undefined
              }
            }
          }
        : {})
    })
})

const ERROR = 'Not deleted'

export const deleteProtocolFx = protocolListDomain.createEffect({
  name: 'deleteProtocol',
  handler: async (id: string) => {
    const isDeleted = await protocolsApi.protocolDelete(id)

    if (isDeleted) {
      return id
    }

    throw new Error(ERROR)
  }
})

export const $protocolList = protocolListDomain
  .createStore<
    (ProtocolFragmentFragment & { deleting: boolean; type: 'Protocol' })[]
  >([], {
    name: '$protocolList'
  })
  .on(fetchProtocolListFx.doneData, (_, payload) =>
    payload.map((protocol) => ({
      ...protocol,
      deleting: false,
      type: 'Protocol'
    }))
  )
  .on(deleteProtocolFx, (state, payload) =>
    state.map((protocol) =>
      protocol.id === payload ? { ...protocol, deleting: true } : protocol
    )
  )
  .on(deleteProtocolFx.done, (state, { params: payload }) =>
    state.filter(({ id }) => id !== payload)
  )

export const ProtocolListGate = createGate({
  domain: protocolListDomain
})

const Open = guard({
  source: userModel.$user,
  clock: ProtocolListGate.open,
  filter: (user) => !user,
  greedy: true
})

sample({
  source: walletNetworkSwitcherModel.$currentNetwork,
  clock: [walletNetworkSwitcherModel.activateNetwork, Open],
  fn: ({ network, blockchain }) => ({ network, blockchain }),
  target: fetchProtocolListFx,
  greedy: true
})
