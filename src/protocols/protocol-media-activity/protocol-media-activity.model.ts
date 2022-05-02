import { createDomain } from 'effector-logger/macro'

import { ProtocolSocialPostsQuery } from '~/api/_generated-types'
import { protocolsApi } from '~/protocols/common'

export const mediaActivity = createDomain()

const LIMIT = 3

export const fetchSocialPostsFx = mediaActivity.createEffect(
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

export const reset = mediaActivity.createEvent()

export const $socialPosts = mediaActivity
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
  .reset(reset)

export const $socialCount = mediaActivity
  .createStore(0)
  .on(fetchSocialPostsFx.doneData, (_, { count }) => count)
  .reset(reset)
