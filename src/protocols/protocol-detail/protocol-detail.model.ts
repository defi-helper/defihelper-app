import { createDomain, guard, sample, UnitValue } from 'effector'
import { createGate } from 'effector-react'

import { authModel } from '~/auth'
import { protocolsApi } from '~/protocols/common'
import { stakingApi } from '~/staking/common'

export const protocolDetailDomain = createDomain()

export const fetchProtocolFx = protocolDetailDomain.createEffect(
  async (params: {
    protocolId: string
    hidden?: null | boolean
    signal?: AbortSignal
  }) => {
    const protocol = await protocolsApi.protocolDetail(
      {
        filter: {
          id: params.protocolId,
        },
        hidden: params.hidden,
      },
      params.signal
    )

    if (!protocol) throw new Error('something went wrong')

    const automations = await stakingApi.automatesContractList({
      filter: {
        protocol: params.protocolId,
      },
    })

    const hasAutostaking = automations.list.some(
      (automation) => automation.contract !== null
    )

    return {
      ...protocol,
      hasAutostaking,
    }
  }
)

export const $protocol = protocolDetailDomain
  .createStore<UnitValue<typeof fetchProtocolFx.doneData> | null>(null)
  .on(fetchProtocolFx.doneData, (_, payload) => payload)

type GateState = {
  protocolId: string
  hidden?: null | boolean
  signal?: AbortSignal
}

export const ProtocolDetailGate = createGate<GateState | null>({
  name: 'ProtocolDetailGate',
  domain: protocolDetailDomain,
  defaultState: null,
})

export const updated = protocolDetailDomain.createEvent()

sample({
  clock: guard({
    source: [
      ProtocolDetailGate.state,
      ProtocolDetailGate.status,
      authModel.$userReady,
    ],
    clock: [
      ProtocolDetailGate.open,
      ProtocolDetailGate.state.updates,
      authModel.$userReady.updates,
      updated,
    ],
    filter: (payload): payload is [GateState, boolean, boolean] => {
      const [gateState, opened, userReady] = payload

      return Boolean(gateState) && opened && userReady
    },
  }),
  fn: ([gate]) => gate,
  target: fetchProtocolFx,
})

$protocol.reset(ProtocolDetailGate.close)
