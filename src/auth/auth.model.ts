import {
  createEffect,
  createEvent,
  createStore,
  sample,
  split,
  guard,
  StoreValue,
  UnitValue,
} from 'effector'
import { shallowEqual } from 'fast-equals'
import { delay } from 'patronum/delay'
import Cookies from 'js-cookie'

import { MeQuery, AuthEthMutation } from '~/api/_generated-types'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { sidUtils, authApi } from './common'
import { history } from '~/common/history'
import { paths } from '~/paths'
import { toastsService } from '~/toasts'
import { dateUtils } from '~/common/date-utils'
import { WavesKeeperConnector } from '~/wallets/common/waves-keeper-connector'
import { analytics } from '~/analytics'
import { UnsupportedChainError } from '~/wallets/common/unsupported-chain'
import * as settingsWalletModel from '~/settings/settings-wallets/settings-wallets.model'

type AuthData = Exclude<AuthEthMutation['authEth'], null | undefined>

const ERROR_MESSAGE = 'Unable to authenticate'

export const fetchUserFx = createEffect(() =>
  authApi.me({
    input: {
      timezone: dateUtils.timezone(),
    },
  })
)

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
      network: input.chainId,
      address: input.account,
      signature: input.signature,
      message: input.message,
      publicKey: input.connector.publicKey ?? input.publicKey,
      timezone: dateUtils.timezone(),
      code: Cookies.get('dfh-parent-code'),
      merge: input.merge,
    })

    if (error?.fetchError) throw error.fetchError
    if (error?.graphQLErrors?.[0])
      throw new Error(error.graphQLErrors[0].message)

    analytics.log('portfolio_connect_wallet_success', {
      address: input.address,
      network: input.chainId,
      blockchain: 'waves',
    })

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

    analytics.log('portfolio_connect_wallet_success', {
      address: input.address,
      network: input.chainId,
      blockchain: 'ethereum',
    })

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
  openChangeNetworkDialog: () => Promise<unknown>
  closeAuthSignMessageDialog: () => void
}

export const open = createEvent<Payload>()
export const close = createEvent()

const mergeModalFx = createEffect((fn: () => unknown) => fn())

export const $auth = createStore<Payload | null>(null)
  .on(open, (_, payload) => payload)
  .reset(close)

split({
  source: guard({
    clock: sample({
      source: settingsWalletModel.$wallets,
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
    ethereum: (wallet) => wallet.chainId !== 'main',
    waves: (wallet) => wallet.chainId === 'main',
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
      Boolean(clock === null && result) && !sidUtils.get(),
  }),
  fn: ({ chainId, account, provider }) => ({
    chainId,
    account: account as string,
    provider,
  }),
  target: walletNetworkModel.signMessageEthereumFx,
})

sample({
  clock: guard({
    source: walletNetworkModel.$wallet,
    clock: authWavesFx.doneData,
    filter: (result, clock): result is WalletStore =>
      Boolean(clock === null && result) && !sidUtils.get(),
  }),
  fn: ({ account, provider, connector, chainId }) => ({
    account: account as string,
    provider,
    connector: connector as WavesKeeperConnector,
    chainId,
  }),
  target: walletNetworkModel.signMessageWavesFx,
})

guard({
  clock: walletNetworkModel.signMessageEthereumFx.doneData,
  filter: () => sidUtils.get() === null,
  target: authEthereumFx,
})

guard({
  clock: walletNetworkModel.signMessageWavesFx.doneData,
  filter: () => sidUtils.get() === null,
  target: authWavesFx,
})

guard({
  clock: [authEthereumFx.doneData, authWavesFx.doneData, authDemoFx.doneData],
  filter: (data) => Boolean(data),
  target: saveUserFx,
})

sample({
  clock: guard({
    source: $auth,
    clock: guard({
      source: $user,
      clock: [authEthereumFx.doneData, authWavesFx.doneData],
      filter: (prevUser, nextUser) =>
        prevUser !== null &&
        prevUser.id !== nextUser?.user.id &&
        Boolean(sidUtils.get()),
    }),
    filter: (auth): auth is Payload => Boolean(auth),
  }),
  fn: ({ openMergeWalletsDialog }) => openMergeWalletsDialog,
  target: mergeModalFx,
})

guard({
  source: walletNetworkModel.$wallet.map((wallet) =>
    wallet
      ? {
          chainId: wallet.chainId,
          account: wallet.account,
          provider: wallet.provider,
        }
      : null
  ),
  clock: mergeModalFx.done,
  filter: (wallet): wallet is walletNetworkModel.SignMessageEthereum =>
    wallet?.chainId !== 'main',
  target: walletNetworkModel.signMessageEthereumFx,
})

guard({
  source: walletNetworkModel.$wallet.map((wallet) =>
    wallet
      ? {
          provider: wallet.provider,
          account: wallet.account,
          connector: wallet.connector,
          chainId: wallet.chainId,
        }
      : null
  ),
  clock: mergeModalFx.done,
  filter: (wallet): wallet is walletNetworkModel.SignMessageWaves =>
    wallet?.chainId === 'main',
  target: walletNetworkModel.signMessageWavesFx,
})

guard({
  clock: walletNetworkModel.signMessageEthereumFx.doneData.map((payload) => ({
    ...payload,
    merge: true,
  })),
  filter: (
    source
  ): source is UnitValue<
    typeof walletNetworkModel.signMessageEthereumFx.doneData
  > & { merge: boolean } => Boolean(source) && Boolean(sidUtils.get()),
  target: authEthereumFx,
})

guard({
  clock: walletNetworkModel.signMessageWavesFx.doneData.map((payload) => ({
    ...payload,
    merge: true,
  })),
  filter: (
    source
  ): source is UnitValue<
    typeof walletNetworkModel.signMessageWavesFx.doneData
  > & { merge: boolean } => Boolean(source) && Boolean(sidUtils.get()),
  target: authWavesFx,
})

guard({
  source: $user,
  clock: [$user.updates, saveUserFx.finally],
  filter: (user) => Boolean(user),
  target: settingsWalletModel.fetchWalletListFx,
})

guard({
  clock: sample({
    source: settingsWalletModel.$wallets,
    clock: walletNetworkModel.signMessage,
    fn: (wallets, signMessage) => ({ wallets, ...signMessage }),
  }),
  filter: (clock) => {
    return Boolean(
      clock.wallets?.some(({ address, network }) => {
        const isWaves = clock.chainId === 'main'

        return isWaves
          ? clock.account === address && clock.chainId === network
          : clock.account.toLowerCase() === address && clock.chainId === network
      })
    )
  },
  target: toastsService.info.prepend(() => 'Wallet already added!'),
})

settingsWalletModel.$wallets.reset(logoutFx)
walletNetworkModel.$wallet.reset(logoutFx)

const openChangeNetworkDialogFx = createEffect((fn: () => unknown) => fn())

guard({
  source: sample({
    source: $auth,
    fn: (auth) => auth?.openChangeNetworkDialog ?? null,
  }),
  clock: [authEthereumFx.failData, authWavesFx.failData],
  filter: (auth, failData): auth is () => Promise<unknown> =>
    Boolean(auth) && failData instanceof UnsupportedChainError,
  target: openChangeNetworkDialogFx,
})

sample({
  clock: guard({
    clock: [authEthereumFx.failData, authWavesFx.failData],
    filter: (failData) => !(failData instanceof UnsupportedChainError),
  }),
  fn: ({ message }) => message,
  target: toastsService.error,
})

fetchUserFx.doneData.watch((data) => {
  if (data === null) {
    sidUtils.remove()
  }
})

sample({
  clock: open,
  target: fetchUserFx,
})
