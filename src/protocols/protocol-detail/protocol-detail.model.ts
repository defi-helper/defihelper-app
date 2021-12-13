import { createDomain, sample } from 'effector-logger/macro'
import { createGate } from 'effector-react'
import { automationApi } from '~/automations/common/automation.api'

import { ProtocolQuery } from '~/graphql/_generated-types'
import { protocolsApi } from '~/protocols/common'

type Protocol = Exclude<ProtocolQuery['protocol'], undefined | null> & {
  hasAutostaking: boolean
}

export const protocolDetailDomain = createDomain()

export const fetchProtocolFx = protocolDetailDomain.createEffect(
  async (params: { protocolId: string }) => {
    const protocol = await protocolsApi.protocolDetail({
      filter: {
        id: params.protocolId,
      },
    })

    if (!protocol) throw new Error('something went wrong')

    const automations = await automationApi.getContracts({
      filter: {
        protocol: params.protocolId,
      },
    })

    const contract = automations.list.find(
      (automation) => automation.contract !== null
    )

    return {
      ...protocol,
      hasAutostaking: Boolean(contract),
    }
  }
)

export const $protocol = protocolDetailDomain
  .createStore<Protocol | null>(null)
  .on(fetchProtocolFx.doneData, (_, payload) => payload)

export const ProtocolDetailGate = createGate<{ protocolId: string }>({
  name: 'ProtocolDetailGate',
  domain: protocolDetailDomain,
})

sample({
  clock: ProtocolDetailGate.open,
  target: fetchProtocolFx,
})

$protocol.reset(ProtocolDetailGate.close)
