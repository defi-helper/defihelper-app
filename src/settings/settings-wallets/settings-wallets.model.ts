import { createDomain, sample, UnitValue, combine, StoreValue } from 'effector'
import contracts from '@defihelper/networks/contracts.json'

import { BlockchainEnum, WalletFragmentFragment } from '~/api/_generated-types'
import { settingsApi } from '~/settings/common'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { bignumberUtils } from '~/common/bignumber-utils'
import { toastsService } from '~/toasts'
import { analytics } from '~/analytics'
import { buildAdaptersUrl } from '~/staking/common/build-adapters-url'
import { loadAdapter } from '~/common/load-adapter'

type Params = {
  amount: string
  walletAddress: string
  chainId: string
  provider: unknown
  blockchain: BlockchainEnum
}

export const walletListDomain = createDomain()

const pagination = {
  limit: 100,
  offset: 0,
}

export const fetchWalletListFx = walletListDomain.createEffect(async () => {
  return settingsApi.walletList({
    pagination,
  })
})

export const fetchWalletListMetricsFx = walletListDomain.createEffect(
  async (signal?: AbortSignal) => {
    return settingsApi.walletListMetrics(
      {
        pagination,
      },
      signal
    )
  }
)

export const updateWalletFx = walletListDomain.createEffect(
  async (params: { walletId: string; name: string }) => {
    const data = await settingsApi.walletUpdate({
      id: params.walletId,
      input: {
        name: params.name,
      },
    })

    if (!data) throw new Error('something went wrong')

    return data
  }
)

export const deleteWalletFx = walletListDomain.createEffect(
  async (walletId: string) => {
    const data = await settingsApi.walletDelete({ id: walletId })

    if (!data) throw new Error('something went wrong')

    return data
  }
)

export const updateStatisticsWalletFx = walletListDomain.createEffect(
  async (walletId: string) => {
    const data = await settingsApi.walletUpdateStatistics({ id: walletId })

    if (!data) throw new Error('something went wrong')

    return data
  }
)

export const loadAdapterFx = walletListDomain.createEffect(
  async (params: { provider: unknown; chainId: string }) => {
    const networkProvider = walletNetworkModel.getNetwork(
      params.provider,
      params.chainId
    )

    const contract = contracts[params.chainId as keyof typeof contracts]

    if (!networkProvider) throw new Error('something went wrong')
    if (!contract)
      throw new Error('current network does not have Balance contract')

    const { balance } = await loadAdapter(buildAdaptersUrl('dfh'))

    return balance(networkProvider.getSigner(), contract.Balance.address)
  }
)

export const depositFx = walletListDomain.createEffect(
  async (params: Params & { transactionHash: string }) => {
    analytics.log(
      'settings_wallet_defihelper_balance_top_up_send_transaction',
      {
        blockchain: params.blockchain,
        amount: params.amount,
        walletAddress: params.walletAddress,
        chainId: params.chainId,
      }
    )
    analytics.log('settings_wallet_defihelper_balance_top_up_success', {
      blockchain: params.blockchain,
      amount: params.amount,
      walletAddress: params.walletAddress,
      chainId: params.chainId,
    })
    await settingsApi.billingTransferCreate({
      input: {
        blockchain: params.blockchain,
        network: params.chainId,
        account: params.walletAddress,
        amount: params.amount,
        tx: params.transactionHash,
      },
    })
  }
)

export const refundFx = walletListDomain.createEffect(
  async (params: Params) => {
    analytics.log(
      'settings_wallet_defihelper_balance_refund_send_transaction',
      {
        blockchain: params.blockchain,
        amount: params.amount,
        walletAddress: params.walletAddress,
        chainId: params.chainId,
      }
    )
    analytics.log('settings_wallet_defihelper_balance_refund_success', {
      blockchain: params.blockchain,
      amount: params.amount,
      walletAddress: params.walletAddress,
      chainId: params.chainId,
    })
  }
)

export const addWallet = walletListDomain.createEvent<WalletFragmentFragment>()

export const $wallets = walletListDomain
  .createStore<
    (WalletFragmentFragment & {
      editing?: boolean
      deleting?: boolean
      depositing?: boolean
      refunding?: boolean
    })[]
  >([])
  .on(fetchWalletListFx.doneData, (_, { list }) => list)
  .on(updateWalletFx, (state, payload) =>
    state.map((wallet) =>
      wallet.id === payload.walletId ? { ...wallet, editing: true } : wallet
    )
  )
  .on(addWallet, (state, payload) => [...state, payload])
  .on(updateWalletFx.doneData, (state, payload) =>
    state.map((wallet) => (wallet.id === payload.id ? payload : wallet))
  )
  .on(deleteWalletFx, (state, payload) =>
    state.map((wallet) =>
      wallet.id === payload ? { ...wallet, deleting: true } : wallet
    )
  )
  .on(deleteWalletFx.finally, (state, { params }) =>
    state.filter((wallet) => wallet.id !== params)
  )
  .on(refundFx, (state, payload) =>
    state.map((wallet) =>
      wallet.address === payload.walletAddress &&
      wallet.network === payload.chainId
        ? { ...wallet, refunding: true }
        : wallet
    )
  )
  .on(refundFx.finally, (state, { params }) =>
    state.map((wallet) =>
      wallet.address === params.walletAddress &&
      wallet.network === params.chainId
        ? { ...wallet, refunding: false }
        : wallet
    )
  )
  .on(depositFx, (state, payload) =>
    state.map((wallet) =>
      wallet.address === payload.walletAddress &&
      wallet.network === payload.chainId
        ? { ...wallet, depositing: true }
        : wallet
    )
  )
  .on(depositFx.finally, (state, { params }) =>
    state.map((wallet) =>
      wallet.address === params.walletAddress &&
      wallet.network === params.chainId
        ? { ...wallet, depositing: false }
        : wallet
    )
  )

export const $walletMetrics = walletListDomain
  .createStore<UnitValue<typeof fetchWalletListMetricsFx.doneData>>({})
  .on(fetchWalletListMetricsFx.doneData, (_, payload) => payload)

type WalletWithMetrics = StoreValue<typeof $wallets>[number] &
  StoreValue<typeof $walletMetrics>[number]

export const $walletsWithMetrics = combine(
  $wallets,
  $walletMetrics,
  (wallets, walletMetrics) =>
    wallets
      .map((wallet) => ({ ...wallet, ...walletMetrics?.[wallet.id] }))
      .sort((a, b) =>
        Number(bignumberUtils.minus(b.metric?.worth, a.metric?.worth))
      )
      .reduce(
        (acc, wallet) => {
          if (bignumberUtils.gt(wallet.metric?.worth, 0)) {
            acc.nonEmpty.push(wallet as WalletWithMetrics)
          } else {
            acc.empty.push(wallet as WalletWithMetrics)
          }

          return acc
        },
        {
          nonEmpty: [] as WalletWithMetrics[],
          empty: [] as WalletWithMetrics[],
        }
      )
)

export const fetchBillingBalanceFx = walletListDomain.createEffect(
  settingsApi.billingBalance
)

export const $networksWithBalance = walletListDomain.createStore(
  Object.entries(contracts)
    .filter(([, obj]) => 'Balance' in obj)
    .reduce<Record<string, boolean>>((acc, [network]) => {
      return {
        [network]: true,
        ...acc,
      }
    }, {})
)

export const updated = walletListDomain.createEvent()

sample({
  clock: updated,
  target: [fetchWalletListFx, fetchWalletListMetricsFx],
})

toastsService.forwardErrors(
  depositFx.failData,
  fetchWalletListFx.failData,
  fetchWalletListMetricsFx.failData,
  refundFx.failData,
  updateWalletFx.failData
)
