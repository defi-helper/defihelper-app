import { createDomain, guard, sample, UnitValue } from 'effector-logger/macro'
import { createGate } from 'effector-react'

import { protocolsApi } from '~/protocols/common'

const protocolDetailOverviewDomain = createDomain()

export const fetchOverviewFx = protocolDetailOverviewDomain.createEffect(
  async (protocolId: string) => {
    const overview = await protocolsApi.protocolDetailOverview({
      filter: {
        id: protocolId,
      },
    })

    if (!overview) throw new Error('something went wrong')

    return overview
  }
)

export const $overview = protocolDetailOverviewDomain
  .createStore<UnitValue<typeof fetchOverviewFx.doneData> | null>(null)
  .on(fetchOverviewFx.doneData, (_, payload) => payload)

export const ProtocolDetailOverviewGate = createGate<string | null>({
  name: 'ProtocolDetailOverviewGate',
  domain: protocolDetailOverviewDomain,
  defaultState: null,
})

sample({
  clock: guard({
    source: [
      ProtocolDetailOverviewGate.state,
      ProtocolDetailOverviewGate.status,
    ],
    clock: [
      ProtocolDetailOverviewGate.open,
      ProtocolDetailOverviewGate.state.updates,
    ],
    filter: (payload): payload is [string, boolean] => {
      const [gateState, opened] = payload

      return Boolean(gateState) && opened
    },
  }),
  fn: ([protocolId]) => protocolId,
  target: fetchOverviewFx,
})

$overview.reset(ProtocolDetailOverviewGate.close)
