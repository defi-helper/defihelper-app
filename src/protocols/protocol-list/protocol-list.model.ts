import { createDomain, guard } from 'effector-logger'
import { createGate } from 'effector-react'
import { config } from '~/config'

import { ProtocolListQuery, BlockchainEnum } from '~/graphql/_generated-types'
import {
  $wallet,
  activateWalletFx,
  updateWalletFx
} from '~/wallets/networks/network.model'
import { protocolsApi } from '../common'

export const protocolListDomain = createDomain('protocolList')

export const fetchProtocolListFx = protocolListDomain.createEffect({
  name: 'fetchProtocolList',
  handler: async (params: { chainId?: number }) =>
    protocolsApi.protocolsList({
      protocolFilter: {
        blockchain: {
          protocol: config.CHAIN_ETHEREUM_IDS.includes(Number(params.chainId))
            ? BlockchainEnum.Ethereum
            : BlockchainEnum.Waves,
          network: params.chainId ? String(params.chainId) : undefined
        }
      }
    })
})

export const $protocolList = protocolListDomain
  .createStore<ProtocolListQuery>(
    {
      list: [],
      pagination: {
        count: 0
      }
    },
    {
      name: 'protocols'
    }
  )
  .on(fetchProtocolListFx.doneData, (_, payload) => payload)

export const Gate = createGate()

guard({
  source: $wallet,
  clock: [Gate.open, activateWalletFx.doneData, updateWalletFx.doneData],
  filter: ({ chainId }) => Boolean(chainId),
  target: fetchProtocolListFx
})
