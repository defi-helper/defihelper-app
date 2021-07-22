import { createDomain, guard, sample } from 'effector-logger'

import { ProtocolFragmentFragment } from '~/graphql/_generated-types'
import { protocolsApi } from '~/protocols/common'
import { deleteProtocolFx } from '~/protocols/protocol-list/protocol-list.model'
import { userModel } from '~/users'

const protocoConnectedlListDomain = createDomain('protocoConnectedlList')

export const fetchProtocolConnectedListFx =
  protocoConnectedlListDomain.createEffect({
    name: 'fetchProtocolConnectedListFx',
    handler: (userId: string) =>
      protocolsApi.protocolList({
        protocolFilter: {
          linked: userId,
        },
      }),
  })

export const $protocolList = protocoConnectedlListDomain
  .createStore<ProtocolFragmentFragment[]>([], {
    name: '$protocolList',
  })
  .on(fetchProtocolConnectedListFx.doneData, (_, payload) => payload.list)
  .on(deleteProtocolFx.done, (state, { params: payload }) =>
    state.filter(({ id }) => id !== payload)
  )

const fetchUser = sample({
  clock: userModel.fetchUserFx.doneData,
  fn: (user) => user?.id,
})

guard({
  clock: fetchUser,
  filter: (userId): userId is string => Boolean(userId),
  target: fetchProtocolConnectedListFx,
})
