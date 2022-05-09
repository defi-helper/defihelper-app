import { createDomain, guard, sample, UnitValue } from 'effector-logger/macro'
import { createGate } from 'effector-react'

import { protocolsApi } from '~/protocols/common'

const protocolDetailReadOnlyDomain = createDomain()

export const fetchProtocolFx = protocolDetailReadOnlyDomain.createEffect(
  async (protocolId: string) => {
    const protocol = await protocolsApi.protocolDetail({
      filter: {
        id: protocolId,
      },
    })

    if (!protocol) throw new Error('something went wrong')

    return protocol
  }
)

export const $protocol = protocolDetailReadOnlyDomain
  .createStore<UnitValue<typeof fetchProtocolFx.doneData> | null>(null)
  .on(fetchProtocolFx.doneData, (_, payload) => payload)

export const ProtocolDetailReadonlyGate = createGate<string | null>({
  name: 'ProtocolDetailReadonlyGate',
  domain: protocolDetailReadOnlyDomain,
  defaultState: null,
})

sample({
  clock: guard({
    source: [
      ProtocolDetailReadonlyGate.state,
      ProtocolDetailReadonlyGate.status,
    ],
    clock: [
      ProtocolDetailReadonlyGate.open,
      ProtocolDetailReadonlyGate.state.updates,
    ],
    filter: (payload): payload is [string, boolean] => {
      const [gateState, opened] = payload

      return Boolean(gateState) && opened
    },
  }),
  fn: ([protocolId]) => protocolId,
  target: fetchProtocolFx,
})

$protocol.reset(ProtocolDetailReadonlyGate.close)
