import { createDomain, guard, sample, restore } from 'effector-logger/macro'
import { createGate } from 'effector-react'
import { debounce } from 'patronum/debounce'

import { createPagination } from '~/common/create-pagination'
import {
  BlockchainEnum,
  ProtocolFavoriteMutationVariables,
} from '~/graphql/_generated-types'
import { protocolsApi, Protocol } from '~/protocols/common'

const protocolListDomain = createDomain()

type Params = {
  blockchain: BlockchainEnum
  network?: string | number
  offset: number
  limit: number
  search?: string
  favorite?: boolean
}

export const fetchProtocolListFx = protocolListDomain.createEffect(
  (params?: Params) =>
    protocolsApi.protocolList({
      ...(params?.search || typeof params?.favorite === 'boolean'
        ? {
            protocolFilter: {
              search: params?.search,
              favorite: params.favorite,
            },
          }
        : {}),
      protocolPagination: {
        offset: params?.offset,
        limit: params?.limit,
      },
    })
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
  .createStore<Protocol[]>([])
  .on(fetchProtocolListFx.doneData, (_, payload) =>
    payload.list.map((protocol) => ({
      ...protocol,
      deleting: false,
      type: 'Protocol',
    }))
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

export const ProtocolListPagination = createPagination({
  domain: protocolListDomain,
})

export const ProtocolListGate = createGate<{
  search: string
  favorite?: boolean
}>({
  domain: protocolListDomain,
  name: 'ProtocolListGate',
})

const gateUpdated = debounce({
  source: ProtocolListGate.state.updates,
  timeout: 500,
})

sample({
  source: [ProtocolListPagination.state, ProtocolListGate.state],
  clock: guard({
    source: ProtocolListGate.status,
    clock: [ProtocolListGate.open, ProtocolListPagination.updates, gateUpdated],
    filter: (gateIsOpened) => gateIsOpened,
  }),
  fn: ([{ offset, limit }, clock]) => ({
    offset,
    limit,
    ...clock,
  }),
  target: fetchProtocolListFx,
})

sample({
  clock: fetchProtocolListFx.doneData,
  fn: (clock) => clock.count,
  target: ProtocolListPagination.totalElements,
})

export const $tabsCount = restore(
  fetchProtocolListFx.doneData.map(({ all, favorites }) => ({
    all,
    favorites,
  })),
  {
    all: 0,
    favorites: 0,
  }
).on(protocolFavoriteFx.done, (state, { params }) => ({
  ...state,
  favorites: params.favorite ? state.favorites + 1 : state.favorites - 1,
}))
