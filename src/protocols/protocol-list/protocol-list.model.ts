import { combine, createDomain, sample } from 'effector-logger'
import { createGate } from 'effector-react'

import { ProtocolFragmentFragment } from '~/graphql/_generated-types'
import { networkModel } from '~/wallets/networks'
import { protocolsApi } from '~/protocols/common'

const protocolListDomain = createDomain('protocolList')

export const fetchProtocolListFx = protocolListDomain.createEffect({
  name: 'fetchProtocolList',
  handler: () => protocolsApi.protocolList({})
})

const ERROR = 'Not deleted'

const deleteProtocolFx = protocolListDomain.createEffect({
  name: 'deleteProtocol',
  handler: async (id: string) => {
    const isDeleted = await protocolsApi.protocolDelete(id)

    if (isDeleted) {
      return id
    }

    throw new Error(ERROR)
  }
})

export const deleteProtocol =
  protocolListDomain.createEvent<string>('deleteProtocol')

const $protocolDeleteInProcessIds = protocolListDomain
  .createStore<Record<string, boolean>>(
    {},
    {
      name: '$protocolDeleteInProcessIds'
    }
  )
  .on(deleteProtocol, (state, payload) => ({ ...state, [payload]: true }))

sample({
  clock: deleteProtocol,
  target: deleteProtocolFx
})

const $protocolList = protocolListDomain
  .createStore<ProtocolFragmentFragment[]>([], {
    name: 'protocols'
  })
  .on(fetchProtocolListFx.doneData, (_, payload) => payload)
  .on(deleteProtocolFx.doneData, (state, payload) =>
    state.filter(({ id }) => id !== payload)
  )

export const $protocols = combine(
  $protocolList,
  $protocolDeleteInProcessIds,
  (protocolList, protocolDeleteInProcessIds) => {
    return protocolList.map((protocol) => ({
      ...protocol,
      deleteInProcess: Boolean(protocolDeleteInProcessIds[protocol.id])
    }))
  }
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
