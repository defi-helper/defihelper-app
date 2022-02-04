import {
  createDomain,
  sample,
  split,
  guard,
  restore,
} from 'effector-logger/macro'
import { createGate } from 'effector-react'
import { shallowEqual } from 'fast-equals'
import { combineEvents } from 'patronum/combine-events'
import { delay } from 'patronum/delay'

import {
  MeQuery,
  AuthEthMutation,
  AuthWavesInputType,
  AuthEthereumInputType,
} from '~/graphql/_generated-types'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import * as settingsWalletModel from '~/settings/settings-wallets/settings-wallets.model'
import { sidUtils, authApi } from './common'
import { history } from '~/common/history'
import { paths } from '~/paths'
import { toastsService } from '~/toasts'

type AuthData = Exclude<AuthEthMutation['authEth'], null | undefined>

const ERROR_MESSAGE = 'Unable to authenticate'

export const authDomain = createDomain()

export const fetchUserFx = authDomain.createEffect(() => authApi.me())

export const logoutFx = authDomain.createEffect(() => sidUtils.remove())

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

export const authWavesFx = authDomain.createEffect(
  async (params: AuthWavesInputType) => {
    const data = await authApi.authWaves(params)

    if (!data) {
      throw new Error(ERROR_MESSAGE)
    }

    return data
  }
)

export const authEthereumFx = authDomain.createEffect(
  async (input: AuthEthereumInputType) => {
    const data = await authApi.authEth({
      ...input,
      merge: input.merge ?? false,
    })

    if (!data) throw new Error(ERROR_MESSAGE)

    return data
  }
)

sample({
  clock: walletNetworkModel.signMessageEthereumFx.doneData,
  fn: (clock) => ({
    network: clock.chainId,
    address: clock.address,
    message: clock.message,
    signature: clock.signature,
  }),
  target: authEthereumFx,
})

sample({
  clock: walletNetworkModel.signMessageWavesFx.doneData,
  fn: (params): AuthWavesInputType => ({
    network: params.network,
    publicKey: params.publicKey,
    address: params.address,
    message: params.message,
    signature: params.signature,
  }),
  target: authWavesFx,
})

const $signedMessageEthereum = restore(
  authEthereumFx.map((payload) => payload),
  null
)

const $signedMessageWaves = restore(
  authWavesFx.map((payload) => payload),
  null
)

const signedUserEthereum = guard({
  clock: authEthereumFx.doneData,
  filter: (clock): clock is AuthData =>
    Boolean(clock) && sidUtils.get() !== clock.sid,
})

const signedUserWaves = guard({
  clock: authWavesFx.doneData,
  filter: (clock): clock is AuthData =>
    Boolean(clock) && sidUtils.get() !== clock.sid,
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

guard({
  clock: sample({
    source: $userWallets,
    clock: walletNetworkModel.signMessage,
    fn: (wallets, signMessage) => ({ wallets, ...signMessage }),
  }),
  filter: (clock) => {
    return Boolean(
      clock.account &&
        clock.wallets?.some(({ address, network }) => {
          const isWaves = clock.chainId === 'main'

          return isWaves
            ? clock.account === address && clock.chainId === network
            : clock.account.toLowerCase() === address &&
                clock.chainId === network
        })
    )
  },
  target: toastsService.info.prepend(() => 'Wallet already added!'),
})

export const openBetaDialogFx = authDomain.createEffect(
  (fn: () => Promise<unknown>) => fn()
)

export const UserGate = createGate<{
  openBetaDialog: () => Promise<unknown>
  openMergeWalletsDialog: () => Promise<unknown>
}>({
  name: 'UserGate',
  domain: authDomain,
})

sample({
  clock: UserGate.open,
  target: fetchUserFx,
})

export const mergeWalletsDialogFx = authDomain.createEffect(
  (fn: () => Promise<unknown>) => fn()
)

sample({
  source: UserGate.state,
  clock: guard({
    source: $user,
    clock: [signedUserWaves, signedUserEthereum],
    filter: (prevUser, { user: nextUser }) =>
      prevUser !== null && prevUser.id !== nextUser.id,
  }),
  fn: ({ openMergeWalletsDialog }) => openMergeWalletsDialog,
  target: mergeWalletsDialogFx,
})

guard({
  source: $signedMessageEthereum.map((store) =>
    store ? { ...store, merge: true } : null
  ),
  clock: mergeWalletsDialogFx.done,
  filter: (
    source
  ): source is Omit<AuthEthereumInputType, 'merge'> & { merge: boolean } =>
    Boolean(source),
  target: authEthereumFx,
})

guard({
  source: $signedMessageWaves,
  clock: mergeWalletsDialogFx.done,
  filter: (source): source is AuthWavesInputType => Boolean(source),
  target: authWavesFx,
})

sample({
  clock: guard({
    source: [UserGate.state, $user],
    clock: saveUser,
    filter: ([, prevUser]) => prevUser === null,
  }),
  fn: ([{ openBetaDialog }]) => openBetaDialog,
  target: openBetaDialogFx,
})

const mergedEthereum = combineEvents({
  events: [
    mergeWalletsDialogFx.done,
    delay({
      source: authEthereumFx.done,
      timeout: 3000,
    }),
  ],
})
const mergedWaves = combineEvents({
  events: [
    mergeWalletsDialogFx.done,
    delay({
      source: authWavesFx.done,
      timeout: 3000,
    }),
  ],
})

guard({
  source: $user,
  clock: [$user.updates, mergedWaves, mergedEthereum],
  filter: (user) => Boolean(user),
  target: settingsWalletModel.fetchWalletListFx,
})
