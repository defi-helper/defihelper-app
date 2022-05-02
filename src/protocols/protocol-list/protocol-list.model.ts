import {
  createDomain,
  guard,
  sample,
  restore,
  UnitValue,
} from 'effector-logger/macro'
import { createGate } from 'effector-react'

import { authModel } from '~/auth'
import { ProtocolFavoriteMutationVariables } from '~/api/_generated-types'
import { protocolsApi, Protocol } from '~/protocols/common'
import { createUseInfiniteScroll } from '~/common/create-use-infinite-scroll'

const protocolListDomain = createDomain()

type Params = {
  offset: number
  limit: number
  search?: string
  favorite?: boolean
  hidden: boolean | null
  debank?: boolean
  abortController?: AbortController
}

export const fetchProtocolListFx = protocolListDomain.createEffect(
  (params: Params) => {
    const filter = {
      hidden: params.hidden,
      isDebank: params.debank,
    }

    return protocolsApi.protocolList(
      {
        ...(params?.search || typeof params?.favorite === 'boolean'
          ? {
              filter: {
                search: params.search,
                favorite: params.favorite,
                ...filter,
              },
            }
          : {
              filter,
            }),
        pagination: {
          offset: params?.offset,
          limit: params?.limit,
        },
      },
      params.abortController?.signal
    )
  }
)

export const fetchProtocolListMetricsFx = protocolListDomain.createEffect(
  (params: Params) => {
    const filter = {
      hidden: params.hidden,
      isDebank: params.debank,
    }

    return protocolsApi.protocolListMetrics(
      {
        ...(params?.search || typeof params?.favorite === 'boolean'
          ? {
              filter: {
                search: params.search,
                favorite: params.favorite,
                ...filter,
              },
            }
          : {
              filter,
            }),
        pagination: {
          offset: params?.offset,
          limit: params?.limit,
        },
      },
      params.abortController?.signal
    )
  }
)

export const fetchProtocolListCountFx = protocolListDomain.createEffect(
  (hidden: boolean | null) => {
    return protocolsApi.protocolListCount({
      hidden,
    })
  }
)

const ERROR = 'Not deleted'

export const deleteProtocolFx = protocolListDomain.createEffect(
  async (id: string) => {
    const isDeleted = await protocolsApi.protocolDelete(id)

    if (isDeleted) {
      return id
    }

    throw new Error(ERROR)
  }
)

export const protocolFavoriteFx = protocolListDomain.createEffect(
  async (input: ProtocolFavoriteMutationVariables['input']) => {
    const isFavorite = await protocolsApi.protocolFavorite({ input })

    if (typeof isFavorite === 'boolean') {
      return isFavorite
    }

    throw new Error('something went wrong')
  }
)

export const $protocolList = protocolListDomain
  .createStore<(Protocol & { metric?: { tvl?: string } })[]>([])
  .on(fetchProtocolListFx.doneData, (state, payload) =>
    state.concat(
      payload.list.map((protocol) => ({
        ...protocol,
        deleting: false,
        type: 'Protocol',
      }))
    )
  )
  .on(deleteProtocolFx, (state, payload) =>
    state.map((protocol) =>
      protocol.id === payload ? { ...protocol, deleting: true } : protocol
    )
  )
  .on(deleteProtocolFx.done, (state, { params: payload }) =>
    state.filter(({ id }) => id !== payload)
  )
  .on(protocolFavoriteFx.done, (state, { params }) =>
    state.map((protocol) =>
      protocol.id === params.protocol
        ? { ...protocol, favorite: params.favorite }
        : protocol
    )
  )

export const $protocolListMetrics = protocolListDomain
  .createStore<UnitValue<typeof fetchProtocolListMetricsFx.doneData> | null>(
    null
  )
  .on(fetchProtocolListMetricsFx.doneData, (state, payload) => ({
    ...state,
    ...payload,
  }))

export const useInfiniteScroll = createUseInfiniteScroll({
  domain: protocolListDomain,
  loading: fetchProtocolListFx.pending,
  items: $protocolList,
})

export const ProtocolListGate = createGate<{
  search: string
  favorite?: boolean
  hidden: boolean | null
  debank?: boolean
  abortController?: AbortController
}>({
  domain: protocolListDomain,
  name: 'ProtocolListGate',
})

sample({
  source: [useInfiniteScroll.state, ProtocolListGate.state],
  clock: guard({
    source: [
      ProtocolListGate.status,
      ProtocolListGate.state,
      authModel.$userReady,
    ],
    clock: [
      useInfiniteScroll.updates,
      ProtocolListGate.state.updates,
      ProtocolListGate.status.updates,
      authModel.$userReady.updates,
    ],
    filter: ([isOpen, , userReady]) => {
      return isOpen && userReady
    },
  }),
  fn: ([{ offset = 0, limit }, clock]): Params => ({
    offset,
    limit,
    ...clock,
  }),
  target: [fetchProtocolListFx, fetchProtocolListMetricsFx],
})

sample({
  source: ProtocolListGate.state,
  clock: guard({
    source: [
      ProtocolListGate.status,
      ProtocolListGate.state,
      authModel.$userReady,
    ],
    clock: [
      ProtocolListGate.state.updates,
      ProtocolListGate.status.updates,
      authModel.$userReady.updates,
    ],
    filter: ([isOpen, , userReady]) => {
      return isOpen && userReady
    },
  }),
  fn: ({ hidden }) => hidden,
  target: fetchProtocolListCountFx,
})

sample({
  clock: fetchProtocolListFx.doneData,
  fn: (clock) => clock.count,
  target: useInfiniteScroll.totalElements,
})

sample({
  clock: ProtocolListGate.state.updates,
  target: useInfiniteScroll.reset,
})

export const $tabsCount = restore(fetchProtocolListCountFx.doneData, {
  all: 0,
  favorites: 0,
}).on(protocolFavoriteFx.done, (state, { params }) => ({
  ...state,
  favorites: params.favorite ? state.favorites + 1 : state.favorites - 1,
}))

$protocolListMetrics.reset(
  ProtocolListGate.close,
  ProtocolListGate.state.updates
)
$protocolList.reset(
  ProtocolListGate.close,
  useInfiniteScroll.reset,
  ProtocolListGate.state.updates
)
$tabsCount.reset(ProtocolListGate.close)
