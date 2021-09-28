import { createDomain, guard, sample } from 'effector-logger/macro'
import { createGate } from 'effector-react'

import { MeQuery } from '~/graphql/_generated-types'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { sidUtils, userApi } from './common'

export const userDomain = createDomain('user')

export const fetchUserFx = userDomain.createEffect(() => userApi.me())

export const $user = userDomain
  .createStore<MeQuery['me'] | null>(null)
  .on(fetchUserFx.doneData, (_, payload) => payload)
  .on(walletNetworkModel.saveUserFx.doneData, (_, payload) => payload)

export const $userWallets = $user.map((user) => user?.wallets.list ?? [])

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

guard({
  source: [$user, walletNetworkModel.$wallet],
  clock: [walletNetworkModel.$wallet.updates],
  filter: ([user, { account, chainId }]) => {
    return Boolean(
      account &&
        user &&
        user.wallets.list &&
        user.wallets.list.every(({ address, network }) => {
          if (Number.isNaN(Number(chainId)) && address !== account) return true
          if (Number.isNaN(Number(chainId)) && address === account) return false

          return (
            (Number(network) !== chainId &&
              address === account.toLowerCase()) ||
            address !== account.toLowerCase()
          )
        })
    )
  },
  target: walletNetworkModel.signMessageFx,
})
