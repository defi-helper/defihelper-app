import clsx from 'clsx'
import { useStore } from 'effector-react'
import React, { useEffect, useMemo, useState } from 'react'
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
import { SellLiquidity } from '~/common/load-adapter'
import { NULL_ADDRESS } from '~/common/constants'
import { ZapFeePayCreateInputType, ZapFeePayCreateTypeEnum } from '~/api'
import * as styles from './invest-sell.css'

export type InvestSellProps = {
  onSubmit?: (variables: ZapFeePayCreateInputType) => void
  contract: InvestContract
  adapter?: SellLiquidity
  tokens?: {
    id: string
    logoUrl: string
    symbol: string
    address: string
  }[]
  onChangeToken: (token: string) => void
  onSell: (sellAmount: string) => void
}

export const InvestSell = (props: InvestSellProps) => {
  const [amount, setAmount] = useState('0')
  const [tokenAddress, setTokenAddress] = useState('')

  const currentUserWallet = useStore(settingsWalletModel.$currentUserWallet)

  const billingBalance = useAsync(async () => {
    return settingsWalletModel.fetchBillingBalanceFx({
      blockchain: props.contract.blockchain,
      network: props.contract.network,
    })
  }, [props.contract])

  const amountThrottled = useThrottle(amount, 1000)

  const approved = useAsyncRetry(async () => {
    if (bignumberUtils.eq(amountThrottled, 0) || !props.adapter) return true

    return props.adapter.methods.isApproved(amountThrottled)
  }, [props.adapter, tokenAddress, amountThrottled])

  const balance = useAsync(async () => {
    return props.adapter?.methods.balanceOf()
  }, [props.adapter])

  const { tokens: propsTokens = [] } = props

  const tokens = useMemo(() => {
    return propsTokens.reduce<Record<string, typeof propsTokens[number]>>(
      (acc, token) => {
        acc[token.address] = token

        return acc
      },
      {}
    )
  }, [propsTokens])

  useEffect(() => {
    if (!tokens[tokenAddress]) return

    props.onChangeToken(tokens[tokenAddress].symbol)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenAddress, tokens])

  const fee = useAsync(
    async () => props.adapter?.methods.fee(),
    [props.adapter]
  )

  const [sellState, handleSell] = useAsyncFn(async () => {
    if (!props.adapter) return

    const { sell, canSell, sellETH } = props.adapter.methods

    try {
      const can = await canSell(amount)

      if (can instanceof Error) throw can
      if (!can) throw new Error("can't sell")

      const { tx } =
        tokenAddress === NULL_ADDRESS
          ? await sellETH(amount, '1')
          : await sell(tokenAddress, amount, '1')

      const result = await tx?.wait()

      analytics.log('lp_tokens_purchase_success', {
        amount: bignumberUtils.floor(amount),
      })

      if (!result?.transactionHash || !currentUserWallet || !fee.value) return

      props.onSubmit?.({
        tx: result.transactionHash,
        wallet: currentUserWallet.id,
        fee: fee.value.native,
        feeUSD: fee.value.usd,
        type: ZapFeePayCreateTypeEnum.Sell,
      })

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

    const { tx } = await approve(amount)

    await tx?.wait()

    approved.retry()
    toastsService.info('tokens approved!')
  }, [props.adapter, tokenAddress, amount])

  useEffect(() => {
    if (!props.tokens) return

    setTokenAddress(props.tokens?.[0].address ?? '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.tokens])

  const amountOut = useAsync(async () => {
    if (!tokenAddress) return

    return props.adapter?.methods.amountOut(tokenAddress, amount)
  }, [props.adapter, tokenAddress, amount])

  useEffect(() => {
    setAmount(balance.value ?? '0')
  }, [tokenAddress, balance.value])

  useEffect(() => {
    if (!amountOut.value) return

    props.onSell(amountOut.value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountOut.value])

  return (
    <React.Fragment>
      <InvestStepsProgress success={1} />
      <Typography
        family="mono"
        transform="uppercase"
        as="div"
        align="center"
        className={styles.title}
      >
        SELL TOKENS
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
        <NumericalInput
          label={
            <>
              Amount{' '}
              <ButtonBase
                className={styles.balance}
                onClick={() => setAmount(balance.value ?? '0')}
              >
                {balance.value ?? '0'} MAX
              </ButtonBase>
            </>
          }
          className={styles.input}
          disabled={approveState.loading || sellState.loading}
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
        <Select
          label="You will get (approximately)"
          className={styles.input}
          disabled={approveState.loading || sellState.loading}
          value={tokenAddress}
          onChange={(event) => setTokenAddress(event.target.value)}
          leftSide={
            <span className={styles.amountOut}>
              ≈ {bignumberUtils.format(amountOut.value)}
            </span>
          }
        >
          {Object.values(tokens ?? {}).map((option) => {
            return (
              <SelectOption key={option.address} value={option.address}>
                {option.logoUrl ? (
                  <img src={option.logoUrl} className={styles.img} alt="" />
                ) : (
                  <span className={styles.imgPlaceHolder} />
                )}
                {option.symbol}
              </SelectOption>
            )
          })}
        </Select>
      </div>
      {sellState.error || approveState.error ? (
        <Typography variant="body3" as="div" className={styles.error}>
          Your transaction failed due to current market conditions. You can try
          to change the amount or use another token
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
            Approve {props.contract.tokens.stakeBase?.symbol}
          </Button>
        )}
        <Button
          onClick={handleSell}
          loading={sellState.loading}
          disabled={approveState.loading || !approved.value}
          color="green"
        >
          SELL TOKENS
        </Button>
      </div>
    </React.Fragment>
  )
}
