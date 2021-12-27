import { createDomain, sample } from 'effector-logger/macro'
import contracts from '@defihelper/networks/contracts.json'
import { ethers } from 'ethers'
import Balance from '@defihelper/networks/abi/Balance.json'

import {
  BlockchainEnum,
  WalletFragmentFragment,
} from '~/graphql/_generated-types'
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

export const fetchWalletListFx = walletListDomain.createEffect(async () => {
  return settingsApi.walletList({ pagination: { limit: 100, offset: 0 } })
})

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

export const updated = walletListDomain.createEvent()
export const created = walletListDomain.createEvent()

sample({
  clock: [updated, created],
  target: fetchWalletListFx,
})

toastsService.forwardErrors(
  depositFx.failData,
  fetchWalletListFx.failData,
  refundFx.failData,
  updateWalletFx.failData
)
