import { createDomain, sample } from 'effector-logger/macro'
import { createGate } from 'effector-react'

import { automationApi } from '~/automations/common/automation.api'
import { bignumberUtils } from '~/common/bignumber-utils'
import { config } from '~/config'
import { ProtocolQuery } from '~/graphql/_generated-types'
import { protocolsApi } from '~/protocols/common'

type Protocol = Exclude<ProtocolQuery['protocol'], undefined | null> & {
  hasAutostaking: boolean
  autostaking: string
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

    const result = await protocolsApi.earnings({
      balance: Number(protocol.metric.myStaked) || config.FIX_SUM,
      apy: Number(protocol.metric.myAPY),
    })

    const [lastAutostakingValue] = result?.optimal.slice(-1) ?? []

    const autostakingApy = bignumberUtils.mul(
      bignumberUtils.div(
        bignumberUtils.minus(
          lastAutostakingValue?.v,
          Number(protocol.metric.myStaked) || config.FIX_SUM
        ),
        Number(protocol.metric.myStaked) || config.FIX_SUM
      ),
      100
    )

    const contract = automations.list.find(
      (automation) => automation.contract !== null
    )

    return {
      ...protocol,
      hasAutostaking: Boolean(contract),
      autostaking: bignumberUtils.minus(autostakingApy, protocol.metric.myAPY),
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
