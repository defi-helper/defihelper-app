import { createDomain, guard, sample } from 'effector-logger/macro'
import { createGate } from 'effector-react'

import {
  ProtocolQuery,
  ProtocolSocialPostsQuery,
} from '~/graphql/_generated-types'
import { protocolsApi } from '~/protocols/common'
import { stakingApi } from '~/staking/common'

type Protocol = Exclude<ProtocolQuery['protocol'], undefined | null> & {
  hasAutostaking: boolean
}

export const protocolDetailDomain = createDomain()

export const fetchProtocolFx = protocolDetailDomain.createEffect(
  async (params: { protocolId: string; offset?: number }) => {
    const protocol = await protocolsApi.protocolDetail({
      filter: {
        id: params.protocolId,
      },
    })

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
  .createStore<Protocol | null>(null)
  .on(fetchProtocolFx.doneData, (_, payload) => payload)

const LIMIT = 3

export const fetchSocialPostsFx = protocolDetailDomain.createEffect(
  async (params: { protocolId: string; offset?: number }) => {
    const filter = {
      id: params.protocolId,
    }

    const pagination = {
      offset: params.offset ?? 0,
      limit: LIMIT,
    }

    return protocolsApi.protocolSocialPosts({
      filter,
      pagination,
    })
  }
)

export const $socialPosts = protocolDetailDomain
  .createStore<
    Exclude<
      Exclude<
        ProtocolSocialPostsQuery['protocol'],
        null | undefined
      >['socialPosts']['list'],
      null | undefined
    >
  >([])
  .on(fetchSocialPostsFx.doneData, (state, payload) => [
    ...state,
    ...payload.list,
  ])

export const $socialCount = protocolDetailDomain
  .createStore(0)
  .on(fetchSocialPostsFx.doneData, (_, { count }) => count)

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

guard({
  clock: ProtocolDetailGate.open,
  filter: (clock): clock is GateState => Boolean(clock),
  target: fetchSocialPostsFx,
})

$protocol.reset(ProtocolDetailGate.close)
$socialPosts.reset(ProtocolDetailGate.close)
