import { createDomain, sample } from 'effector-logger'
import { createGate } from 'effector-react'

import { ProtocolListQuery } from '~/graphql/_generated-types'
import { protocolsApi } from '../common'

export const protocolListDomain = createDomain('protocolList')

export const fetchProtocolListFx = protocolListDomain.createEffect({
  name: 'fetchProtocolList',
  handler: async () => protocolsApi.protocolsList({})
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

sample({
  clock: Gate.open,
  target: fetchProtocolListFx
})
