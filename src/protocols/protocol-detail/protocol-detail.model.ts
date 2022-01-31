import { createDomain, guard, sample } from 'effector-logger/macro'
import { createGate } from 'effector-react'
import omit from 'lodash.omit'

import { ProtocolQuery } from '~/graphql/_generated-types'
import { protocolsApi } from '~/protocols/common'
import { stakingApi } from '~/staking/common'

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

    const automations = await stakingApi.automatesContractList({
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

type GateState = { protocolId: string }

export const ProtocolDetailGate = createGate<GateState | null>({
  name: 'ProtocolDetailGate',
  domain: protocolDetailDomain,
  defaultState: null,
})

export const updated = protocolDetailDomain.createEvent()

sample({
  clock: guard({
    source: [ProtocolDetailGate.state, ProtocolDetailGate.status],
    clock: [ProtocolDetailGate.open, ProtocolDetailGate.state.updates, updated],
    filter: (payload): payload is [GateState, boolean] => {
      const [gateState, opened] = payload

      return Boolean(gateState) && opened
    },
  }),
  fn: ([{ protocolId }]) => ({ protocolId }),
  target: fetchProtocolFx,
})

$protocol.reset(ProtocolDetailGate.close)
$socialPosts.reset(ProtocolDetailGate.close)
