import { createDomain, sample } from 'effector-logger'
import { createGate } from 'effector-react'
import { Unwrap } from '~/common/types'

import { MetricGroupEnum, ProtocolQuery } from '~/graphql/_generated-types'
import { protocolsApi } from '~/protocols/common'

export const protocolDetailDomain = createDomain('protocolList')

export const fetchProtocolFx = protocolDetailDomain.createEffect({
  name: 'fetchProtocolList',
  handler: async (params: { protocolId: string }) =>
    protocolsApi.protocolDetail({
      filter: {
        id: params.protocolId
      }
    })
})

export const fetchMetricFx = protocolDetailDomain.createEffect({
  name: 'fetchMetricFx',
  handler: async (params: { protocolId: string; group: MetricGroupEnum }) => {
    const data = await protocolsApi.protocolDetailMetric({
      filter: {
        id: params.protocolId
      },
      metric: 'tvl',
      metricGroup: params.group
    })

    return {
      group: params.group,
      data
    }
  }
})

export const $protocol = protocolDetailDomain
  .createStore<ProtocolQuery['protocol'] | null>(null, {
    name: 'protocol'
  })
  .on(fetchProtocolFx.doneData, (_, payload) => payload)

type State = Record<
  MetricGroupEnum,
  {
    data: Unwrap<ReturnType<typeof protocolsApi.protocolDetailMetric>>
    value: MetricGroupEnum
    loading: boolean
  }
>

const initialState = Object.values(MetricGroupEnum).reduce<State>(
  (acc, metricGroup) => {
    acc[metricGroup] = {
      data: [],
      value: metricGroup,
      loading: false
    }

    return acc
  },
  {} as State
)

export const $metric = protocolDetailDomain
  .createStore(initialState, { name: '$metric' })
  .on(fetchMetricFx, (state, payload) => ({
    ...state,
    [payload.group]: {
      ...state[payload.group],
      loading: true
    }
  }))
  .on(fetchMetricFx.doneData, (state, payload) => ({
    ...state,
    [payload.group]: {
      ...state[payload.group],
      data: payload.data,
      loading: false
    }
  }))

export const ProtocolDetailGate = createGate<{ protocolId: string }>({
  name: 'ProtocolDetailGate',
  domain: protocolDetailDomain
})

export const ProtocolMetricGate = createGate<{
  protocolId: string
  group: MetricGroupEnum
}>({
  name: 'ProtocolMetricGate',
  domain: protocolDetailDomain
})

sample({
  clock: ProtocolDetailGate.open,
  target: fetchProtocolFx
})

sample({
  clock: ProtocolMetricGate.open,
  target: fetchMetricFx
})
