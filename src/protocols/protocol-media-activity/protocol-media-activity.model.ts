import { createDomain } from 'effector-logger/macro'

import { ProtocolSocialPostsQuery } from '~/graphql/_generated-types'
import { protocolsApi } from '~/protocols/common'

export const protocolDetailDomain = createDomain()

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
