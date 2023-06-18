import { useStore } from 'effector-react'
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
import { BuyLiquidityUniv3 } from '~/common/load-adapter'
import { ZapFeePayCreateInputType, ZapFeePayCreateTypeEnum } from '~/api'
import { InvestPlusMinus } from '../common/invest-plus-minus'
import * as styles from './invest-buy-uni3.css'
import { NULL_ADDRESS } from '~/common/constants'

export type InvestBuyUni3Props = {
  onSubmit?: (variables: ZapFeePayCreateInputType) => void
  contract: InvestContract
  adapter?: BuyLiquidityUniv3 | null
  tokens?: {
    id: string
    logoUrl: string
    symbol: string
    address: string
  }[]
}

enum Errors {
  default,
  balance,
}

const ErrorMessages = {
  [Errors.default]: (
    <>
      Your transaction is failed due to current market conditions. You can try
      to change the slippage or use another token
    </>
  ),
  [Errors.balance]: (
    <>
      Transaction failed. Please check that you have enough native tokens on
      your wallet to pay the fees.
    </>
  ),
}

export const InvestBuyUni3 = (props: InvestBuyUni3Props) => {
  const [error, setError] = useState<Errors | null>(null)

  const [amount, setAmount] = useState('0')
  const [width, setWidth] = useState(10)
  const initialTokenAddress = props.tokens?.[0]?.address ?? ''

  const [tokenAddress, setTokenAddress] = useState(initialTokenAddress)

  const currentUserWallet = useStore(settingsWalletModel.$currentUserWallet)

  const billingBalance = useAsync(async () => {
    return settingsWalletModel.fetchBillingBalanceFx({
      blockchain: props.contract.blockchain,
      network: props.contract.network,
    })
  }, [props.contract])

  const interval = useAsync(async () => {
    if (!props.adapter) return

    return props.adapter.methods.interval(width)
  }, [props.adapter, width])

  const amountThrottled = useThrottle(amount, 300)

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
        balance: (await balanceOf(token.address).catch(console.error)) ?? '0',
      }))
    )

    return tokensWithBalances.reduce<
      Record<string, typeof tokensWithBalances[number]>
    >((acc, token) => {
      acc[token.address] = token

      return acc
    }, {})
  }, [props.tokens, props.adapter])

  const fee = useAsync(
    async () => props.adapter?.methods.fee(),
    [props.adapter]
  )

  const [buyState, handleBuy] = useAsyncFn(async () => {
    if (!props.adapter || !fee.value) return

    const { buy, canBuy, buyETH } = props.adapter.methods

    setError(null)

    try {
      const can = await canBuy(tokenAddress, amount)

      if (can instanceof Error) throw can
      if (!can) throw new Error("can't buy")

      if (
        bignumberUtils.gt(
          fee.value.native,
          tokens.value?.[tokenAddress]?.balance
        )
      ) {
        setError(Errors.balance)

        return
      }

      const { tx } =
        tokenAddress === NULL_ADDRESS
          ? await buyETH(amount, width, '1')
          : await buy(tokenAddress, amount, width, '1')

      const result = await tx?.wait()

      analytics.log('lp_tokens_purchase_success', {
        amount: bignumberUtils.floor(amount),
      })

      if (!result?.transactionHash || !currentUserWallet) return

      props.onSubmit?.({
        tx: result.transactionHash,
        wallet: currentUserWallet.id,
        fee: fee.value.native,
        feeUSD: fee.value.usd,
        type: ZapFeePayCreateTypeEnum.Buy,
      })

      tokens.retry()

      return true
    } catch {
      analytics.log('lp_tokens_purchase_unsuccess', {
        amount: bignumberUtils.floor(amount),
      })

      setError(Errors.default)

      return false
    }
  }, [props.adapter, tokenAddress, width, amount, fee.value, tokens.value])

  const [approveState, handleApprove] = useAsyncFn(async () => {
    if (!props.adapter) return

    const { approve } = props.adapter.methods

    setError(null)

    try {
      const { tx } = await approve(tokenAddress, amount)

      await tx?.wait()

      toastsService.info('tokens approved!')
    } catch {
      setError(Errors.default)
    } finally {
      tokens.retry()
      approved.retry()
    }
  }, [props.adapter, tokenAddress, amount])

  useEffect(() => {
    const message = approveState.error?.message ?? buyState.error?.message

    if (!message) return setError(null)

    setError(Errors.default)
  }, [approveState.error, buyState.error])

  useEffect(() => {
    if (!initialTokenAddress) return

    setTokenAddress(initialTokenAddress)
  }, [initialTokenAddress])

  const handleChangeWidth = (val: number | string) => setWidth(Number(val))

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
      <Typography
        variant="body2"
        as="div"
        align="center"
        className={styles.subtitle}
      >
        1-click convert tokens to LP tokens
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
          {Object.values(tokens.value ?? {}).map((option) => {
            const renderValue = (
              <>
                {option.logoUrl ? (
                  <img src={option.logoUrl} className={styles.img} alt="" />
                ) : (
                  <span className={styles.imgPlaceHolder} />
                )}
                {option.symbol}
              </>
            )

            return (
              <SelectOption
                key={option.address}
                value={option.address}
                renderValue={renderValue}
              >
                {renderValue}
                <Typography variant="inherit" className={styles.tokenBalance}>
                  {option.balance}
                </Typography>
              </SelectOption>
            )
          })}
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
        <div className={styles.interval}>
          <InvestPlusMinus
            min={0}
            max={100}
            onMinus={handleChangeWidth}
            onPlus={handleChangeWidth}
            value={interval.value?.token0.priceLower}
            width={width}
            label="MIN PRICE"
            type="minus"
            disabled={approveState.loading || buyState.loading}
          />
          <div className={styles.intervalBetween}>–</div>
          <InvestPlusMinus
            min={0}
            max={100}
            onMinus={handleChangeWidth}
            onPlus={handleChangeWidth}
            value={interval.value?.token0.priceUpper}
            width={width}
            label="MAX PRICE"
            type="plus"
            disabled={approveState.loading || buyState.loading}
          />
        </div>
      </div>
      {error ? (
        <Typography variant="body3" as="div" className={styles.error}>
          {ErrorMessages[error]}
        </Typography>
      ) : (
        <InvestFee
          tokenSymbol={billingBalance.value?.token ?? ''}
          fee={fee.value}
        />
      )}
      <div className={clsx(styles.stakeActions, styles.mt)}>
        {!approved.value && tokenAddress !== NULL_ADDRESS && (
          <Button
            onClick={handleApprove}
            color="green"
            loading={approveState.loading}
          >
            Approve
          </Button>
        )}
        <Button
          onClick={handleBuy}
          loading={buyState.loading}
          disabled={
            (approveState.loading || !approved.value) &&
            tokenAddress !== NULL_ADDRESS
          }
          color="green"
        >
          BUY TOKENS
        </Button>
      </div>
    </React.Fragment>
  )
}
