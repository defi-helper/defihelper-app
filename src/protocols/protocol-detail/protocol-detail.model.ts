import { createDomain, sample } from 'effector-logger/macro'
import { createGate } from 'effector-react'
import omit from 'lodash.omit'

import { automationApi } from '~/automations/common/automation.api'
import { ProtocolQuery } from '~/graphql/_generated-types'
import { protocolsApi } from '~/protocols/common'

type Protocol = Exclude<ProtocolQuery['protocol'], undefined | null> & {
  hasAutostaking: boolean
}

export const protocolDetailDomain = createDomain()

const LIMIT = 3

export const fetchProtocolFx = protocolDetailDomain.createEffect(
  async (params: { protocolId: string; offset?: number }) => {
    const protocol = await protocolsApi.protocolDetail({
      filter: {
        id: params.protocolId,
      },
      socialPostsPagination: {
        offset: params.offset ?? 0,
        limit: LIMIT,
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
  .createStore<Omit<Protocol, 'socialPosts'> | null>(null)
  .on(fetchProtocolFx.doneData, (_, payload) => omit(payload, 'socialPosts'))

export const $socialPosts = protocolDetailDomain
  .createStore<Exclude<Protocol['socialPosts']['list'], null | undefined>>([])
  .on(fetchProtocolFx.doneData, (state, { socialPosts }) => [
    ...state,
    ...(socialPosts.list ?? []),
  ])

export const ProtocolDetailGate = createGate<{ protocolId: string }>({
  name: 'ProtocolDetailGate',
  domain: protocolDetailDomain,
})

sample({
  clock: ProtocolDetailGate.open,
  target: fetchProtocolFx,
})

$protocol.reset(ProtocolDetailGate.close)
