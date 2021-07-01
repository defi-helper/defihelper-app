import { createDomain, sample } from 'effector-logger'
import { createGate } from 'effector-react'

import { ProtocolFragmentFragment } from '~/graphql/_generated-types'
import { networkModel } from '~/wallets/networks'
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
  .createStore<ProtocolFragmentFragment[]>([], {
    name: 'protocols'
  })
  .on(fetchProtocolListFx.doneData, (_, payload) => payload)
  .on(deleteProtocolFx.doneData, (state, payload) =>
    state.filter(({ id }) => id !== payload)
  )

export const Gate = createGate({
  domain: protocolListDomain
})

sample({
  source: networkModel.$wallet,
  clock: [
    Gate.open,
    networkModel.activateWalletFx.doneData,
    networkModel.updateWalletFx.doneData
  ],
  target: fetchProtocolListFx
})
