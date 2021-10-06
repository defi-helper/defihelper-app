import { createDomain, guard, sample } from 'effector-logger/macro'
import { createGate } from 'effector-react'

import { createPagination } from '~/common/create-pagination'
import {
  BlockchainEnum,
  ProtocolFragmentFragment,
} from '~/graphql/_generated-types'
import { protocolsApi } from '~/protocols/common'

const protocolListDomain = createDomain('protocolList')

export const fetchProtocolListFx = protocolListDomain.createEffect({
  name: 'fetchProtocolListFx',
  handler: (params?: {
    blockchain: BlockchainEnum
    network?: string | number
    offset: number
    limit: number
  }) =>
    protocolsApi.protocolList({
      ...(params?.blockchain
        ? {
            protocolFilter: {
              blockchain: {
                protocol: params.blockchain,
                network:
                  params.network !== 'waves'
                    ? String(params.network)
                    : undefined,
              },
            },
          }
        : {}),
      protocolPagination: {
        offset: params?.offset,
        limit: params?.limit,
      },
    }),
})

const ERROR = 'Not deleted'

export const deleteProtocolFx = protocolListDomain.createEffect({
  name: 'deleteProtocol',
  handler: async (id: string) => {
    const isDeleted = await protocolsApi.protocolDelete(id)

    if (isDeleted) {
      return id
    }

    throw new Error(ERROR)
  },
})

export const $protocolList = protocolListDomain
  .createStore<
    (ProtocolFragmentFragment & { deleting: boolean; type: 'Protocol' })[]
  >([], {
    name: '$protocolList',
  })
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

export const ProtocolListGate = createGate({
  domain: protocolListDomain,
  name: 'ProtocolListGate',
})

sample({
  source: ProtocolListPagination.state,
  clock: guard({
    source: ProtocolListGate.status,
    clock: [ProtocolListGate.open, ProtocolListPagination.updates],
    filter: (gateIsOpened) => gateIsOpened,
  }),
  fn: ({ offset, limit }) => ({
    offset,
    limit,
  }),
  target: fetchProtocolListFx,
})

sample({
  clock: fetchProtocolListFx.doneData,
  fn: (clock) => clock.count,
  target: ProtocolListPagination.totalElements,
})
