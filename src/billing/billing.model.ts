import { createDomain, Effect, forward } from 'effector-logger'
import { nanoid } from 'nanoid'
import contracts from '@defihelper/networks/contracts.json'
import Balance from '@defihelper/networks/abi/Balance.json'
import { ethers } from 'ethers'
import { createGate } from 'effector-react'

import { networkModel } from '~/wallets/wallet-networks'
import { bignumberUtils } from '~/common/bignumber-utils'
import { toastsService } from '~/toasts'
import { BillingBalanceType } from '~/graphql/_generated-types'
import { billingApi } from './common'

type ChainIdEnum = keyof typeof contracts

const isChainId = (chainId: unknown): chainId is ChainIdEnum =>
  typeof chainId === 'string' && chainId in contracts

export const billingDomain = createDomain('billingDomain')

const createBalance = <T extends string>(amount: string, fnName: T) => {
  const { chainId, networkProvider, account } = networkModel.getNetwork()

  const chainIdString = String(chainId)

  if (!isChainId(chainIdString) || !networkProvider) {
    throw new Error('chainId does not support')
  }

  if (!account) {
    throw new Error('Account is required')
  }

  const contract = contracts[chainIdString]

  const balanceContract = new ethers.Contract(
    contract.Balance.address,
    Balance.abi,
    networkProvider.getSigner()
  )

  const method = balanceContract[fnName]

  if (!method) {
    throw new Error('something went wrong')
  }
  const amountNormalized = bignumberUtils.toSend(amount, 18)

  return {
    amountNormalized,
    networkProvider,
    account,
    [fnName]: method,
    balanceContract,
  }
}

export const depositFx = billingDomain.createEffect({
  name: 'depositFx',
  handler: async (amount: string) => {
    const { networkProvider, amountNormalized, account, deposit } =
      createBalance(amount, 'deposit')

    const balance = await networkProvider.getBalance(account)

    if (balance.lt(amountNormalized)) {
      throw new Error('not enough money')
    }

    await deposit(account, { value: amountNormalized })
  },
})

const createKeyStore = (name: string, event: Effect<string, void, Error>) =>
  billingDomain.createStore(name, { name }).on(event.doneData, () => nanoid())

export const $deposit = createKeyStore('$deposit', depositFx)

export const refundFx = billingDomain.createEffect({
  name: 'refundFx',
  handler: async (amount: string) => {
    const { amountNormalized, account, refund, balanceContract } =
      createBalance(amount, 'refund')

    const balance = await balanceContract.netBalanceOf(account)

    if (balance.lt(amountNormalized)) {
      throw new Error('not enough money')
    }

    await refund(amountNormalized)
  },
})

export const $refund = createKeyStore('$refund', refundFx)

toastsService.forwardErrors(refundFx.failData, depositFx.failData)

const fetchBalanceFx = billingDomain.createEffect({
  name: 'fetchBalanceFx',
  handler: () => billingApi.balance(),
})

export const $billingBalance = billingDomain
  .createStore<BillingBalanceType | null>(null, {
    name: '$billingBalance',
  })
  .on(fetchBalanceFx.doneData, (_, payload) => payload)

export const BillingGate = createGate({
  domain: billingDomain,
  name: 'BillingGate',
})

forward({
  from: BillingGate.open,
  to: fetchBalanceFx,
})
