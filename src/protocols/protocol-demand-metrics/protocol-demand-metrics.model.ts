import { createDomain, guard, sample, UnitValue } from 'effector-logger/macro'
import { createGate } from 'effector-react'

import { protocolsApi } from '~/protocols/common'

const protocolDemandMetricsDomain = createDomain()

export const fetchDemandMetricsFx = protocolDemandMetricsDomain.createEffect(
  async (protocolId: string) => {
    const overview = await protocolsApi.protocolDemandMetrics({
      filter: {
        id: protocolId,
      },
    })

    if (!overview) throw new Error('something went wrong')

    return overview
  }
)

export const $demandMetrics = protocolDemandMetricsDomain
  .createStore<UnitValue<typeof fetchDemandMetricsFx.doneData> | null>(null)
  .on(fetchDemandMetricsFx.doneData, (_, payload) => payload)

export const ProtocolDemandMetricsGate = createGate<string | null>({
  name: 'ProtocolDemandMetricsGate',
  domain: protocolDemandMetricsDomain,
  defaultState: null,
})

sample({
  clock: guard({
    source: [ProtocolDemandMetricsGate.state, ProtocolDemandMetricsGate.status],
    clock: [
      ProtocolDemandMetricsGate.open,
      ProtocolDemandMetricsGate.state.updates,
    ],
    filter: (payload): payload is [string, boolean] => {
      const [gateState, opened] = payload

      return Boolean(gateState) && opened
    },
  }),
  fn: ([protocolId]) => protocolId,
  target: fetchDemandMetricsFx,
})

$demandMetrics.reset(ProtocolDemandMetricsGate.close)
