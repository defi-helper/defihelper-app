import { createDomain, sample, split, guard } from 'effector-logger/macro'
import { createGate } from 'effector-react'

import { MeQuery } from '~/graphql/_generated-types'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import * as settingsWalletModel from '~/settings/settings-wallets/settings-wallets.model'
import { sidUtils, userApi } from './common'

export const authDomain = createDomain()

export const fetchUserFx = authDomain.createEffect(userApi.me)

export const logoutFx = authDomain.createEffect(sidUtils.remove)

export const $user = authDomain
  .createStore<MeQuery['me'] | null>(null)
  .on(fetchUserFx.doneData, (_, payload) => payload)
  .on(walletNetworkModel.saveUserFx.doneData, (_, payload) => payload)
  .reset(logoutFx.done)

export const $userWallets = settingsWalletModel.$wallets

export const UserGate = createGate({
  name: 'UserGate',
  domain: authDomain,
})

sample({
  clock: UserGate.open,
  target: fetchUserFx,
})

sample({
  clock: $user.updates,
  target: settingsWalletModel.fetchWalletListFx,
})

fetchUserFx.doneData.watch((data) => {
  if (data) return

  sidUtils.remove()
})

split({
  source: guard({
    clock: sample({
      source: $userWallets,
      clock: walletNetworkModel.signMessage,
      fn: (wallets, signMessage) => ({ wallets, ...signMessage }),
    }),
    filter: (clock) => {
      if (!clock.wallets.length) return true

      return Boolean(
        clock.account &&
          clock.wallets?.every(({ address, network }) => {
            if (clock.chainId === 'W' && address !== clock.account) return true
            if (clock.chainId === 'W' && address === clock.account) return false

            return (
              (Number(network) !== Number(clock.chainId) &&
                address === clock.account.toLowerCase()) ||
              address !== clock.account.toLowerCase()
            )
          })
      )
    },
  }),
  match: {
    waves: (source) => source.chainId === 'W' && Boolean(source.provider),
    ethereum: (source) => Boolean(source.provider),
  },
  cases: {
    waves: walletNetworkModel.signMessageWavesFx,
    ethereum: walletNetworkModel.signMessageEthereumFx,
  },
})
