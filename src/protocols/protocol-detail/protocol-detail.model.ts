import { createDomain, sample } from 'effector-logger'
import { createGate } from 'effector-react'

import { ProtocolQuery } from '~/graphql/_generated-types'
import { protocolsApi } from '~/protocols/common'

export const protocolDetailDomain = createDomain('protocolList')

export const fetchProtocolFx = protocolDetailDomain.createEffect({
  name: 'fetchProtocolFx',
  handler: async (params: { protocolId: string }) =>
    protocolsApi.protocolDetail({
      filter: {
        id: params.protocolId,
      },
    }),
})

export const $protocol = protocolDetailDomain
  .createStore<ProtocolQuery['protocol'] | null>(null, {
    name: 'protocol',
  })
  .on(fetchProtocolFx.doneData, (_, payload) => payload)

export const ProtocolDetailGate = createGate<{ protocolId: string }>({
  name: 'ProtocolDetailGate',
  domain: protocolDetailDomain,
})

sample({
  clock: ProtocolDetailGate.open,
  target: fetchProtocolFx,
  greedy: true,
})
