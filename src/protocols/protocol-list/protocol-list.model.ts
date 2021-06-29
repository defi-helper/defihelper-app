import { createDomain, sample } from 'effector-logger'
import { createGate } from 'effector-react'

import { ProtocolsQuery } from '~/graphql/_generated-types'
import {
  $wallet,
  activateWalletFx,
  updateWalletFx
} from '~/wallets/networks/network.model'
import { protocolsApi } from '../common'

export const protocolListDomain = createDomain('protocolList')

export const fetchProtocolListFx = protocolListDomain.createEffect({
  name: 'fetchProtocolList',
  handler: async () => protocolsApi.protocolList({})
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
  .createStore<ProtocolsQuery['protocols']>(
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
  .on(deleteProtocolFx.doneData, (state, payload) => {
    const list = state.list?.filter(({ id }) => id !== payload)

    return {
      ...state,
      list
    }
  })

export const Gate = createGate({
  domain: protocolListDomain
})

sample({
  source: $wallet,
  clock: [Gate.open, activateWalletFx.doneData, updateWalletFx.doneData],
  target: fetchProtocolListFx
})
