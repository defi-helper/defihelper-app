import {
  createEffect,
  createEvent,
  createStore,
  sample,
  split,
  guard,
  restore,
  StoreValue,
  UnitValue,
} from 'effector'
import { shallowEqual } from 'fast-equals'
import { delay } from 'patronum/delay'
import Cookies from 'js-cookie'

import { MeQuery, AuthEthMutation } from '~/api/_generated-types'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import * as settingsWalletModel from '~/settings/settings-wallets/settings-wallets.model'
import { sidUtils, authApi } from './common'
import { history } from '~/common/history'
import { paths } from '~/paths'
import { toastsService } from '~/toasts'
import { dateUtils } from '~/common/date-utils'
import { WavesKeeperConnector } from '~/wallets/common/waves-keeper-connector'

type AuthData = Exclude<AuthEthMutation['authEth'], null | undefined>

const ERROR_MESSAGE = 'Unable to authenticate'

export const fetchUserFx = createEffect(() => authApi.me())

export const logoutFx = createEffect(() => {
  sidUtils.remove()
})

logoutFx.done.watch(() => {
  history.push(paths.portfolio)
})

export const saveUserFx = createEffect(async (data?: AuthData | null) => {
  if (!data) throw new Error(ERROR_MESSAGE)

  sidUtils.set(data.sid)

  return data.user
})

export const $user = createStore<Exclude<MeQuery['me'], undefined>>(null)
  .on(fetchUserFx.doneData, (state, payload) =>
    shallowEqual(state, payload) ? undefined : payload
  )
  .on(saveUserFx.doneData, (state, payload) =>
    shallowEqual(state, payload) ? undefined : payload
  )
  .reset(logoutFx.done)

export const authWavesFx = createEffect(
  async (
    input: UnitValue<typeof walletNetworkModel.signMessageWavesFx.doneData> & {
      merge?: boolean
    }
  ) => {
    const { data, error } = await authApi.authWaves({
      network: input.network,
      address: input.account,
      signature: input.signature,
      message: input.message,
      publicKey: input.publicKey,
      timezone: dateUtils.timezone(),
      code: Cookies.get('dfh-parent-code'),
      merge: input.merge,
    })

    if (error?.fetchError) throw error.fetchError
    if (error?.graphQLErrors?.[0])
      throw new Error(error.graphQLErrors[0].message)

    return data
  }
)

type WalletStore = Exclude<
  Required<StoreValue<typeof walletNetworkModel.$wallet>>,
  null
>

export const authEthereumFx = createEffect(
  async (
    input: UnitValue<
      typeof walletNetworkModel.signMessageEthereumFx.doneData
    > & { merge?: boolean }
  ) => {
    const { data, error } = await authApi.authEth({
      network: input.chainId,
      address: input.account,
      signature: input.signature,
      message: input.message,
      timezone: dateUtils.timezone(),
      code: Cookies.get('dfh-parent-code'),
      merge: input.merge,
    })

    if (error?.fetchError) throw error.fetchError
    if (error?.graphQLErrors?.[0])
      throw new Error(error.graphQLErrors[0].message)

    return data
  }
)

export const authDemoFx = createEffect(async () => {
  const data = await authApi.authDemo()
  if (!data) throw new Error(ERROR_MESSAGE)

  return data
})

authDemoFx.finally.watch(() => {
  localStorage.removeItem('demo') // TODO: remove
})

const userReady = delay({ source: fetchUserFx.finally, timeout: 500 })

export const $userReady = createStore(false).on(userReady, () => true)

type Payload = {
  openVideoDialog: () => Promise<unknown>
  openMergeWalletsDialog: () => Promise<unknown>
  openAuthSignMessageDialog: () => Promise<unknown>
  closeAuthSignMessageDialog: () => void
}

export const open = createEvent<Payload>()
export const close = createEvent()

const mergeModalFx = createEffect((fn: () => unknown) => fn())

export const $auth = createStore<Payload | null>(null)
  .on(open, (_, payload) => payload)
  .reset(close)

split({
  source: walletNetworkModel.$wallet.updates,
  match: {
    ethereum: (wallet) =>
      Boolean(wallet && wallet.chainId !== 'main') && !sidUtils.get(),
    waves: (wallet) =>
      Boolean(wallet && wallet.chainId === 'main') && !sidUtils.get(),
  },
  cases: {
    ethereum: authEthereumFx,
    waves: authWavesFx,
  },
})

sample({
  clock: guard({
    source: walletNetworkModel.$wallet,
    clock: authEthereumFx.doneData,
    filter: (result, clock): result is WalletStore =>
      Boolean(clock === null && result),
  }),
  fn: ({ chainId, account, provider }) => ({
    chainId,
    account: account ?? '',
    provider,
  }),
  target: walletNetworkModel.signMessageEthereumFx,
})

sample({
  clock: guard({
    source: walletNetworkModel.$wallet,
    clock: authWavesFx.doneData,
    filter: (result, clock): result is WalletStore =>
      Boolean(clock === null && result),
  }),
  fn: ({ account, provider, connector }) => ({
    account: account ?? '',
    provider,
    connector: connector as WavesKeeperConnector,
  }),
  target: walletNetworkModel.signMessageWavesFx,
})

sample({
  clock: walletNetworkModel.signMessageEthereumFx.doneData,
  target: authEthereumFx,
})

sample({
  clock: walletNetworkModel.signMessageWavesFx.doneData,
  target: authWavesFx,
})

sample({
  clock: [authEthereumFx.doneData, authWavesFx.doneData],
  target: saveUserFx,
})

sample({
  clock: guard({
    source: $auth,
    clock: guard({
      source: $user,
      clock: [authWavesFx.doneData, authWavesFx.doneData],
      filter: (prevUser, nextUser) =>
        prevUser !== null && prevUser.id !== nextUser?.user.id,
    }),
    filter: (auth): auth is Payload => Boolean(auth),
  }),
  fn: ({ openMergeWalletsDialog }) => openMergeWalletsDialog,
  target: mergeModalFx,
})

const $signedMessageEthereum = restore(
  walletNetworkModel.signMessageEthereumFx.doneData.map((payload) => ({
    ...payload,
    merge: true,
  })),
  null
).reset(logoutFx)

const $signedMessageWaves = restore(
  walletNetworkModel.signMessageWavesFx.doneData.map((payload) => ({
    ...payload,
    merge: true,
  })),
  null
).reset(logoutFx)

guard({
  source: $signedMessageEthereum,
  clock: mergeModalFx.done,
  filter: (
    source
  ): source is UnitValue<
    typeof walletNetworkModel.signMessageEthereumFx.doneData
  > & { merge: boolean } => Boolean(source),
  target: authEthereumFx,
})

guard({
  source: $signedMessageWaves,
  clock: mergeModalFx.done,
  filter: (
    source
  ): source is UnitValue<
    typeof walletNetworkModel.signMessageWavesFx.doneData
  > & { merge: boolean } => Boolean(source),
  target: authWavesFx,
})

guard({
  source: $user,
  clock: [$user.updates, saveUserFx.doneData],
  filter: (user) => Boolean(user),
  target: settingsWalletModel.fetchWalletListFx,
})

settingsWalletModel.$wallets.reset(logoutFx)

authEthereumFx.failData.watch((error) => toastsService.error(error.message))
authWavesFx.failData.watch((error) => toastsService.error(error.message))
