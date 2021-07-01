import { createDomain, sample } from 'effector-logger'
import { createGate } from 'effector-react'

import { MeQuery } from '~/graphql/_generated-types'
import { networkModel } from '~/wallets/networks'
import { userApi } from './common'

export const userDomain = createDomain('user')

export const fetchUserFx = userDomain.createEffect({
  name: 'fetchUser',
  handler: async () => userApi.me()
})

export const $user = userDomain
  .createStore<MeQuery['me'] | null>(null, {
    name: 'store'
  })
  .on(fetchUserFx.doneData, (_, payload) => payload)
  .on(networkModel.signMessageFx.doneData, (_, payload) => payload)

export const Gate = createGate()

sample({
  clock: Gate.open,
  target: fetchUserFx
})
