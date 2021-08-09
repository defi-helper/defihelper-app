import { createDomain, sample } from 'effector-logger'
import { createGate } from 'effector-react'

import { MeQuery } from '~/graphql/_generated-types'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { sidUtils, userApi } from './common'

export const userDomain = createDomain('user')

export const fetchUserFx = userDomain.createEffect({
  name: 'fetchUserFx',
  handler: () => userApi.me(),
})

export const $user = userDomain
  .createStore<MeQuery['me'] | null>(null, {
    name: '$user',
  })
  .on(fetchUserFx.doneData, (_, payload) => payload)
  .on(walletNetworkModel.saveUserFx.doneData, (_, payload) => payload)

export const UserGate = createGate({
  name: 'UserGate',
  domain: userDomain,
})

sample({
  clock: UserGate.open,
  target: fetchUserFx,
})

fetchUserFx.doneData.watch((data) => {
  if (data) return

  sidUtils.remove()
})
