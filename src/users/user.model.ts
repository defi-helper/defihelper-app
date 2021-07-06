import { createDomain, sample } from 'effector-logger'
import { createGate } from 'effector-react'

import { MeQuery } from '~/graphql/_generated-types'
import { networkModel } from '~/wallets/networks'
import { sidUtils, userApi } from './common'

export const userDomain = createDomain('user')

export const fetchUserFx = userDomain.createEffect({
  name: 'fetchUserFx',
  handler: () => userApi.me()
})

export const $user = userDomain
  .createStore<MeQuery['me'] | null>(null, {
    name: '$user'
  })
  .on(fetchUserFx.doneData, (_, payload) => payload)
  .on(networkModel.signMessageFx.doneData, (_, payload) => payload)

export const Gate = createGate()

sample({
  clock: Gate.open,
  target: fetchUserFx
})

fetchUserFx.doneData.watch((data) => {
  if (data) return

  sidUtils.remove()
})
