import { createDomain, sample } from 'effector-logger/macro'
import { createGate } from 'effector-react'

import { ProtocolQuery } from '~/graphql/_generated-types'
import { protocolsApi } from '~/protocols/common'

export const protocolDetailDomain = createDomain()

export const fetchProtocolFx = protocolDetailDomain.createEffect(
  async (params: { protocolId: string }) =>
    protocolsApi.protocolDetail({
      filter: {
        id: params.protocolId,
      },
    })
)

export const $protocol = protocolDetailDomain
  .createStore<ProtocolQuery['protocol'] | null>(null)
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
