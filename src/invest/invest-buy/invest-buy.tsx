import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { useAsync, useAsyncFn, useAsyncRetry, useThrottle } from 'react-use'

import { Button } from '~/common/button'
import { Select, SelectOption } from '~/common/select'
import { Typography } from '~/common/typography'
import { settingsWalletModel } from '~/settings/settings-wallets'
import { InvestPoolTokens } from '~/invest/common/invest-pool-tokens'
import { InvestContract } from '~/invest/common/invest.types'
import { InvestStepsProgress } from '~/invest/common/invest-steps-progress'
import { NumericalInput } from '~/common/numerical-input'
import { InvestFee } from '~/invest/common/invest-fee'
import { bignumberUtils } from '~/common/bignumber-utils'
import { ButtonBase } from '~/common/button-base'
import { toastsService } from '~/toasts'
import { analytics } from '~/analytics'
import { BuyLiquidity } from '~/common/load-adapter'
import * as styles from './invest-buy.css'

export type InvestBuyProps = {
  onSubmit?: (transactionHash?: string) => void
  contract: InvestContract
  adapter?: BuyLiquidity
  tokens?: {
    id: string
    logoUrl: string
    symbol: string
    address: string
  }[]
}

export const InvestBuy = (props: InvestBuyProps) => {
  const [amount, setAmount] = useState('0')
  const [tokenAddress, setTokenAddress] = useState('')

  const billingBalance = useAsync(async () => {
    return settingsWalletModel.fetchBillingBalanceFx({
      blockchain: props.contract.blockchain,
      network: props.contract.network,
    })
  }, [props.contract])

  const amountThrottled = useThrottle(amount, 1000)

  const approved = useAsyncRetry(async () => {
    if (bignumberUtils.eq(amountThrottled, 0) || !props.adapter) return true

    return props.adapter.methods.isApproved(tokenAddress, amountThrottled)
  }, [props.adapter, tokenAddress, amountThrottled])

  const tokens = useAsyncRetry(async () => {
    if (!props.adapter || !props.tokens) return

    const { balanceOf } = props.adapter.methods

    const tokensWithBalances = await Promise.all(
      props.tokens.map(async (token) => ({
        ...token,
        balance: await balanceOf(token.address),
      }))
    )

    return tokensWithBalances.reduce<
      Record<string, typeof tokensWithBalances[number]>
    >((acc, token) => {
      acc[token.address] = token

      return acc
    }, {})
  }, [props.tokens, props.adapter])

  const [buyState, handleBuy] = useAsyncFn(async () => {
    if (!props.adapter) return

    const { buy, canBuy } = props.adapter.methods

    try {
      const can = await canBuy(tokenAddress, amount)

      if (can instanceof Error) throw can
      if (!can) throw new Error("can't buy")

      const { tx } = await buy(tokenAddress, amount, '1')

      const result = await tx?.wait()

      analytics.log('lp_tokens_purchase_success', {
        amount: bignumberUtils.floor(amount),
      })

      props.onSubmit?.(result?.transactionHash)

      return true
    } catch (error) {
      analytics.log('lp_tokens_purchase_unsuccess', {
        amount: bignumberUtils.floor(amount),
      })

      throw error
    }
  }, [props.adapter, tokenAddress, amount])

  const [approveState, handleApprove] = useAsyncFn(async () => {
    if (!props.adapter) return

    const { approve } = props.adapter.methods

    const { tx } = await approve(tokenAddress, amount)

    await tx?.wait()

    tokens.retry()
    approved.retry()
    toastsService.info('tokens approved!')
  }, [props.adapter, tokenAddress, amount])

  useEffect(() => {
    if (!props.tokens) return

    setTokenAddress(props.tokens?.[0].address ?? '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.tokens])

  const fee = useAsync(
    async () => props.adapter?.methods.fee(),
    [props.adapter]
  )

  return (
    <React.Fragment>
      <InvestStepsProgress current={0} />
      <Typography
        family="mono"
        transform="uppercase"
        as="div"
        align="center"
        className={styles.title}
      >
        BUY TOKENS
      </Typography>
      <div className={styles.row}>
        <Typography variant="body2" family="mono">
          Pool
        </Typography>
        <div className={styles.poolRight}>
          <InvestPoolTokens tokens={props.contract.tokens.stake} />
          {props.contract.name}
        </div>
      </div>
      <div className={styles.inputs}>
        <Select
          label="Token"
          className={styles.input}
          disabled={approveState.loading || buyState.loading}
          value={tokenAddress}
          onChange={(event) => setTokenAddress(event.target.value)}
        >
          {Object.values(tokens.value ?? {}).map((option) => (
            <SelectOption key={option.address} value={option.address}>
              {option.logoUrl ? (
                <img src={option.logoUrl} className={styles.img} alt="" />
              ) : (
                <span className={styles.imgPlaceHolder} />
              )}
              {option.symbol}
            </SelectOption>
          ))}
        </Select>
        <NumericalInput
          label={
            <>
              Amount{' '}
              <ButtonBase
                className={styles.balance}
                onClick={() =>
                  setAmount(tokens.value?.[tokenAddress]?.balance ?? '0')
                }
              >
                {tokens.value?.[tokenAddress]?.balance ?? '0'} MAX
              </ButtonBase>
            </>
          }
          className={styles.input}
          disabled={approveState.loading || buyState.loading}
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
      </div>
      {buyState.error || approveState.error ? (
        <Typography variant="body3" as="div" className={styles.error}>
          Your transaction is failed due to current market conditions. You can
          try to change the slippage or use another token
        </Typography>
      ) : (
        <InvestFee
          tokenSymbol={billingBalance.value?.token ?? ''}
          fee={fee.value}
        />
      )}
      <div className={clsx(styles.stakeActions, styles.mt)}>
        {!approved.value && (
          <Button
            onClick={handleApprove}
            color="green"
            loading={approveState.loading}
          >
            Approve {tokens.value?.[tokenAddress]?.symbol}
          </Button>
        )}
        <Button
          onClick={handleBuy}
          loading={buyState.loading}
          disabled={approveState.loading || !approved.value}
          color="green"
        >
          BUY TOKENS
        </Button>
      </div>
    </React.Fragment>
  )
}
