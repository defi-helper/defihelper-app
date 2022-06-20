import { createDomain, sample, UnitValue, combine, StoreValue } from 'effector'
import contracts from '@defihelper/networks/contracts.json'
import { ethers } from 'ethers'
import Balance from '@defihelper/networks/abi/Balance.json'

import { BlockchainEnum, WalletFragmentFragment } from '~/api/_generated-types'
import { settingsApi } from '~/settings/common'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { bignumberUtils } from '~/common/bignumber-utils'
import { toastsService } from '~/toasts'
import { parseError } from '~/common/parse-error'

type ChainIdEnum = keyof typeof contracts

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

const isChainId = (chainId: unknown): chainId is ChainIdEnum =>
  String(chainId) in contracts

const createContract = (
  provider: unknown,
  chainId: string | number,
  account: string
) => {
  const networkProvider = walletNetworkModel.getNetwork(provider, chainId)

  if (!isChainId(chainId) || !networkProvider) {
    throw new Error('chainId does not support')
  }

  if (!account) {
    throw new Error('Account is required')
  }

  const contract = contracts[chainId]

  const balanceContract = new ethers.Contract(
    contract.Balance.address,
    Balance.abi,
    networkProvider.getSigner()
  )

  return {
    networkProvider,
    account,
    balanceContract,
  }
}

export const depositFx = walletListDomain.createEffect(
  async (params: Params) => {
    const { networkProvider, account, balanceContract } = createContract(
      params.provider,
      params.chainId,
      params.walletAddress
    )

    const amountNormalized = bignumberUtils.toSend(params.amount, 18)

    const balance = await networkProvider.getBalance(account)

    if (balance.lt(amountNormalized)) {
      throw new Error('not enough funds')
    }

    try {
      const transactionReceipt = await balanceContract.deposit(account, {
        value: amountNormalized,
      })

      const result = await transactionReceipt.wait()
      await settingsApi.billingTransferCreate({
        input: {
          blockchain: params.blockchain,
          network: params.chainId,
          account: params.walletAddress,
          amount: params.amount,
          tx: result.transactionHash,
        },
      })
    } catch (error) {
      throw parseError(error)
    }
  }
)

export const refundFx = walletListDomain.createEffect(
  async (params: Params) => {
    const { account, balanceContract } = createContract(
      params.provider,
      params.chainId,
      params.walletAddress
    )

    const amountNormalized = bignumberUtils.toSend(params.amount, 18)

    const balance = await balanceContract.netBalanceOf(account)

    if (balance.lt(amountNormalized)) {
      throw new Error('not enough money')
    }

    try {
      const transactionReceipt = await balanceContract.refund(amountNormalized)

      await transactionReceipt.wait()
    } catch (error) {
      throw parseError(error)
    }
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
