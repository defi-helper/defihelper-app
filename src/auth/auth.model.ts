import {
  createDomain,
  sample,
  split,
  guard,
  restore,
} from 'effector-logger/macro'
import { shallowEqual } from 'fast-equals'
import { delay } from 'patronum/delay'

import Cookies from 'js-cookie'
import {
  MeQuery,
  AuthEthMutation,
  AuthWavesInputType,
  AuthEthereumInputType,
} from '~/api/_generated-types'
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

export const logoutFx = authDomain.createEffect(() => {
  sidUtils.remove()
})

logoutFx.done.watch(() => {
  history.push(paths.portfolio)
})

export const saveUserFx = authDomain.createEffect(async (data: AuthData) => {
  sidUtils.set(data.sid)

  if (data.user.role === 'demo') {
    localStorage.setItem('video', 'true')
  }

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
    const data = await authApi.authWaves({
      ...params,
      code: Cookies.get('dfh-parent-code'),
      merge: params.merge ?? false,
    })

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
      code: Cookies.get('dfh-parent-code'),
      merge: input.merge ?? false,
    })

    if (!data) throw new Error(ERROR_MESSAGE)

    return data
  }
)

export const authDemoFx = authDomain.createEffect(async () => {
  const data = await authApi.authDemo()
  if (!data) throw new Error(ERROR_MESSAGE)

  return data
})

const userReady = delay({ source: fetchUserFx.finally, timeout: 500 })

export const $userReady = authDomain
  .createStore(false)
  .on(userReady, () => true)

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

const preparedUserDemo = guard({
  clock: authDemoFx.doneData,
  filter: (clock): clock is AuthData =>
    Boolean(clock) && sidUtils.get() !== clock.sid,
})

const saveUser = sample({
  clock: guard({
    clock: sample({
      source: $user,
      clock: [signedUserWaves, signedUserEthereum, preparedUserDemo],
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

type Payload = {
  openVideoDialog: () => Promise<unknown>
  openMergeWalletsDialog: () => Promise<unknown>
  openAuthSignMessageDialog: () => Promise<unknown>
  closeAuthSignMessageDialog: () => void
}

export const open = authDomain.createEvent<Payload>()
export const close = authDomain.createEvent()

export const $auth = authDomain
  .createStore<Payload | null>(null)
  .on(open, (_, payload) => payload)
  .reset(close)

const openModalFx = authDomain.createEffect((modal: () => Promise<unknown>) =>
  modal()
)

const closeModalFx = authDomain.createEffect((fn: () => void) => fn())

sample({
  clock: guard({
    source: $auth,
    clock: walletNetworkModel.signMessage,
    filter: (modal): modal is Payload => Boolean(modal),
  }),
  fn: ({ openAuthSignMessageDialog }) => openAuthSignMessageDialog,
  target: openModalFx,
})

sample({
  clock: open,
  target: fetchUserFx,
})

sample({
  clock: guard({
    source: $auth,
    clock: guard({
      source: $user,
      clock: [signedUserWaves, signedUserEthereum],
      filter: (prevUser, { user: nextUser }) =>
        prevUser !== null && prevUser.id !== nextUser.id,
    }),
    filter: (auth): auth is Payload => Boolean(auth),
  }),
  fn: ({ openMergeWalletsDialog }) => openMergeWalletsDialog,
  target: openModalFx,
})

sample({
  clock: guard({
    source: $auth,
    clock: [signedUserWaves, signedUserEthereum],
    filter: (modal): modal is Payload => Boolean(modal),
  }),
  fn: ({ closeAuthSignMessageDialog }) => closeAuthSignMessageDialog,
  target: closeModalFx,
})

guard({
  source: $signedMessageEthereum.map((store) =>
    store ? { ...store, merge: true } : null
  ),
  clock: openModalFx.done,
  filter: (
    source
  ): source is Omit<AuthEthereumInputType, 'merge'> & { merge: boolean } =>
    Boolean(source),
  target: authEthereumFx,
})

guard({
  source: $signedMessageWaves.map((store) =>
    store ? { ...store, merge: true } : null
  ),
  clock: openModalFx.done,
  filter: (
    source
  ): source is Omit<AuthWavesInputType, 'merge'> & { merge: boolean } =>
    Boolean(source),
  target: authWavesFx,
})

sample({
  clock: guard({
    source: [$auth, $user],
    clock: saveUser,
    filter: (source): source is [Payload, null] => {
      const [auth, prevUser] = source

      return Boolean(auth) && prevUser === null
    },
  }),
  fn: ([{ openVideoDialog }]) => openVideoDialog,
  target: openModalFx,
})

guard({
  source: $user,
  clock: [$user.updates, saveUserFx.doneData],
  filter: (user) => Boolean(user),
  target: settingsWalletModel.fetchWalletListFx,
})
