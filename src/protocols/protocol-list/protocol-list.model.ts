import { createDomain, guard, sample } from 'effector-logger/macro'
import { createGate } from 'effector-react'
import { debounce } from 'patronum/debounce'

import { createPagination } from '~/common/create-pagination'
import { BlockchainEnum } from '~/graphql/_generated-types'
import { protocolsApi, Protocol } from '~/protocols/common'

const protocolListDomain = createDomain()

export const fetchProtocolListFx = protocolListDomain.createEffect(
  (params?: {
    blockchain: BlockchainEnum
    network?: string | number
    offset: number
    limit: number
    search: string
  }) =>
    protocolsApi.protocolList({
      ...(params?.search
        ? {
            protocolFilter: {
              search: params?.search,
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

export const ProtocolListPagination = createPagination({
  domain: protocolListDomain,
})

export const ProtocolListGate = createGate<string>({
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
  fn: ([{ offset, limit }, search]) => ({
    offset,
    limit,
    search,
  }),
  target: fetchProtocolListFx,
})

sample({
  clock: fetchProtocolListFx.doneData,
  fn: (clock) => clock.count,
  target: ProtocolListPagination.totalElements,
})
