import { createDomain, sample } from 'effector-logger'
import { createGate } from 'effector-react'

import { MetricGroupEnum, ProtocolQuery } from '~/graphql/_generated-types'
import { protocolsApi } from '~/protocols/common'

export const protocolDetailDomain = createDomain('protocolList')

export const fetchProtocolFx = protocolDetailDomain.createEffect({
  name: 'fetchProtocolList',
  handler: async (params: { protocolId: string }) =>
    protocolsApi.protocolDetail({
      filter: {
        id: params.protocolId
      },
      metric: 'tvl',
      metricGroup: MetricGroupEnum.Day
    })
})

export const $protocol = protocolDetailDomain
  .createStore<ProtocolQuery['protocol'] | null>(null, {
    name: 'protocol'
  })
  .on(fetchProtocolFx.doneData, (_, payload) => payload)

export const Gate = createGate<{ protocolId: string }>({
  domain: protocolDetailDomain
})

sample({
  clock: Gate.open,
  target: fetchProtocolFx
})
