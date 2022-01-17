import { createDomain, sample, split, guard } from 'effector-logger/macro'
import { createGate } from 'effector-react'
import { shallowEqual } from 'fast-equals'

import { MeQuery, AuthEthMutation } from '~/graphql/_generated-types'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import * as settingsWalletModel from '~/settings/settings-wallets/settings-wallets.model'
import { sidUtils, authApi } from './common'
import { history } from '~/common/history'
import { paths } from '~/paths'
import { toastsService } from '~/toasts'

type AuthData = Exclude<AuthEthMutation['authEth'], null | undefined>

export const authDomain = createDomain()

export const fetchUserFx = authDomain.createEffect(authApi.me)

export const logoutFx = authDomain.createEffect(sidUtils.remove)

logoutFx.done.watch(() => history.push(paths.portfolio))

export const saveUserFx = authDomain.createEffect(async (data: AuthData) => {
  sidUtils.set(data.sid)

  return data.user
})

export const $user = authDomain
  .createStore<Exclude<MeQuery['me'], undefined>>(null)
  .on(fetchUserFx.doneData, (state, payload) =>
    shallowEqual(state, payload) ? undefined : payload
  )
  .on(saveUserFx.doneData, (state, payload) =>
    shallowEqual(state, payload) ? undefined : payload
  )
  .reset(logoutFx.done)

export const $userWallets = settingsWalletModel.$wallets.reset(
  logoutFx.doneData
)

const signedUserEthereum = guard({
  clock: walletNetworkModel.signMessageEthereumFx.doneData,
  filter: (clock): clock is AuthData =>
    Boolean(clock) && sidUtils.get() !== clock.sid,
})

const signedUserWaves = guard({
  clock: walletNetworkModel.signMessageWavesFx.doneData,
  filter: (clock): clock is AuthData =>
    Boolean(clock) && sidUtils.get() !== clock.sid,
})

guard({
  source: $user,
  clock: [signedUserWaves, signedUserEthereum],
  filter: (prevUser, { user: nextUser }) =>
    prevUser !== null && prevUser.id !== nextUser.id,
  target: toastsService.error.prepend(() => 'Log out first'),
})

const saveUser = sample({
  clock: guard({
    clock: sample({
      source: $user,
      clock: [signedUserWaves, signedUserEthereum],
      fn: (prevUser, nextUser) => ({ prevUser, nextUser }),
    }),
    filter: ({ prevUser, nextUser }) =>
      prevUser === null || prevUser.id === nextUser.user.id,
  }),
  fn: ({ nextUser }) => nextUser,
  target: saveUserFx,
})

fetchUserFx.doneData.watch((data) => {
  if (data === null) {
    sidUtils.remove()
  }
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
            if (clock.chainId === 'main' && address !== clock.account)
              return true
            if (clock.chainId === 'main' && address === clock.account)
              return false

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
    waves: (source) => source.chainId === 'main' && Boolean(source.provider),
    ethereum: (source) => Boolean(source.provider),
  },
  cases: {
    waves: walletNetworkModel.signMessageWavesFx,
    ethereum: walletNetworkModel.signMessageEthereumFx,
  },
})

const openBetaDialogFx = authDomain.createEffect((fn: () => Promise<unknown>) =>
  fn()
)

export const UserGate = createGate<() => Promise<unknown>>({
  name: 'UserGate',
  domain: authDomain,
})

sample({
  clock: UserGate.open,
  target: fetchUserFx,
})

sample({
  clock: guard({
    source: [UserGate.state, $user],
    clock: saveUser,
    filter: ([source, prevUser]) =>
      typeof source === 'function' && prevUser === null,
  }),
  fn: ([cb]) => cb,
  target: openBetaDialogFx,
})

guard({
  clock: $user.updates,
  filter: (user) => Boolean(user),
  target: settingsWalletModel.fetchWalletListFx,
})
