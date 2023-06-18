import clsx from 'clsx'
import { useStore } from 'effector-react'
import React, { useEffect, useMemo, useState } from 'react'
import { useAsync, useAsyncFn, useAsyncRetry } from 'react-use'

import { Button } from '~/common/button'
import { Select, SelectOption } from '~/common/select'
import { Typography } from '~/common/typography'
import { settingsWalletModel } from '~/settings/settings-wallets'
import { InvestPoolTokens } from '~/invest/common/invest-pool-tokens'
import { InvestContract } from '~/invest/common/invest.types'
import { InvestStepsProgress } from '~/invest/common/invest-steps-progress'
import { InvestFee } from '~/invest/common/invest-fee'
import { bignumberUtils } from '~/common/bignumber-utils'
import { toastsService } from '~/toasts'
import { analytics } from '~/analytics'
import { SellLiquidityUniv3 } from '~/common/load-adapter'
import { NULL_ADDRESS } from '~/common/constants'
import { ZapFeePayCreateInputType, ZapFeePayCreateTypeEnum } from '~/api'
import * as styles from './invest-sell-uni3.css'
import { Paper } from '~/common/paper'
import { Icon } from '~/common/icon'

export type InvestSellUni3Props = {
  onSubmit?: (variables: ZapFeePayCreateInputType) => void
  contract: InvestContract
  adapter?: SellLiquidityUniv3 | null
  tokens?: {
    id: string
    logoUrl: string
    symbol: string
    address: string
  }[]
  onChangeToken: (token: string) => void
  onSell: (sellAmount: string) => void
}

enum Errors {
  default,
  balance,
}

const ErrorMessages = {
  [Errors.default]: (
    <>
      Your transaction failed due to current market conditions. You can try to
      change the amount or use another token
    </>
  ),
  [Errors.balance]: (
    <>
      Transaction failed. Please check that you have enough native tokens on
      your wallet to pay the fees.
    </>
  ),
}

const amount = '1'

export const InvestSellUni3 = (props: InvestSellUni3Props) => {
  const [error, setError] = useState<Errors | null>(null)

  const [tokenAddress, setTokenAddress] = useState('')

  const currentUserWallet = useStore(settingsWalletModel.$currentUserWallet)

  const billingBalance = useAsync(async () => {
    return settingsWalletModel.fetchBillingBalanceFx({
      blockchain: props.contract.blockchain,
      network: props.contract.network,
    })
  }, [props.contract])

  const approved = useAsyncRetry(async () => {
    if (!props.adapter) return true

    return props.adapter.methods.isApproved(amount)
  }, [props.adapter, tokenAddress])

  const positions = useAsync(async () => {
    if (!props.adapter) return []

    const res = await props.adapter.methods.positions()

    return Promise.all(
      res?.map(async (position) => ({
        ...position,
        amountOut0:
          (await props.adapter?.methods
            .amountOut(position.id, position.token0.address)
            .catch(console.error)) ?? '0',
        amountOut1:
          (await props.adapter?.methods
            .amountOut(position.id, position.token1.address)
            .catch(console.error)) ?? '0',
      }))
    )
  }, [props.adapter])

  const tokens = useMemo(() => {
    return (
      positions.value?.reduce<
        Record<
          string,
          Exclude<typeof positions.value, undefined>[number] & {
            userGet: string
          }
        >
      >((acc, token) => {
        acc[token.id] = {
          ...token,
          userGet: bignumberUtils.plus(
            token.token0.amountUSD,
            token.token1.amountUSD
          ),
        }

        return acc
      }, {}) ?? {}
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positions.value])

  useEffect(() => {
    if (!tokens[tokenAddress]) return

    props.onChangeToken(tokenAddress)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenAddress, tokens])

  const fee = useAsync(
    async () => props.adapter?.methods.fee(),
    [props.adapter]
  )

  const [sellState, handleSell] = useAsyncFn(async () => {
    if (!props.adapter) return

    const { sell, canSell, sellETH } = props.adapter.methods

    setError(null)

    try {
      const can = await canSell(amount)

      if (can instanceof Error) throw can
      if (!can) throw new Error("can't sell")

      const { tx } =
        tokenAddress === NULL_ADDRESS
          ? await sellETH(Number(tokenAddress), amount)
          : await sell(Number(tokenAddress), amount, '1')

      const result = await tx?.wait()

      analytics.log('lp_tokens_purchase_success', {
        amount: bignumberUtils.floor(amount),
      })

      if (!result?.transactionHash || !currentUserWallet || !fee.value) return

      if (bignumberUtils.gt(fee.value.native, amount)) {
        setError(Errors.balance)

        return
      }

      props.onSubmit?.({
        tx: result.transactionHash,
        wallet: currentUserWallet.id,
        fee: fee.value.native,
        feeUSD: fee.value.usd,
        type: ZapFeePayCreateTypeEnum.Sell,
      })

      return true
    } catch {
      analytics.log('lp_tokens_purchase_unsuccess', {
        amount: bignumberUtils.floor(amount),
      })

      setError(Errors.default)

      return false
    }
  }, [props.adapter, tokenAddress, amount, currentUserWallet, fee.value])

  const [approveState, handleApprove] = useAsyncFn(async () => {
    if (!props.adapter) return

    const { approve } = props.adapter.methods

    setError(null)

    try {
      const { tx } = await approve(tokenAddress)

      await tx?.wait()

      approved.retry()
      toastsService.info('tokens approved!')

      return true
    } catch {
      setError(Errors.default)

      return false
    }
  }, [props.adapter, tokenAddress])

  useEffect(() => {
    if (!props.tokens) return

    setTokenAddress(props.tokens?.[0].address ?? '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.tokens])

  const amountOut = useAsync(async () => {
    if (!tokenAddress) return

    return props.adapter?.methods.amountOut(Number(tokenAddress), amount)
  }, [props.adapter, tokenAddress, amount])

  useEffect(() => {
    if (!amountOut.value) return

    props.onSell(amountOut.value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountOut.value])

  useEffect(() => {
    const message = approveState.error?.message ?? sellState.error?.message

    if (!message) return setError(null)

    setError(Errors.default)
  }, [approveState.error, sellState.error])

  const iconMap = props.contract.tokens.reward.reduce<Record<string, string>>(
    (acc, token) => {
      acc[token.symbol] = token.alias?.logoUrl ?? ''

      return acc
    },
    {}
  )

  return (
    <React.Fragment>
      <InvestStepsProgress success={1} steps={3} />
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
        <Select
          label="You will get (approximately)"
          className={styles.input}
          disabled={approveState.loading || sellState.loading}
          value={tokenAddress}
          onChange={(event) => setTokenAddress(event.target.value)}
          leftSide={
            <span className={styles.amountOut}>
              ≈ ${bignumberUtils.format(tokens[tokenAddress]?.userGet)}
            </span>
          }
        >
          {Object.values(tokens).map((position) => {
            const token0Icon = iconMap[position.token0.symbol]

            const renderValue = (
              <>
                {token0Icon ? (
                  <img alt="" src={token0Icon} className={styles.tokenIcon} />
                ) : (
                  <Paper className={styles.tokenIcon}>
                    <Icon icon="unknownNetwork" width="16" height="16" />
                  </Paper>
                )}
                {position.token0.price.lower} - {position.token0.price.upper}{' '}
                per {position.token1.symbol}
              </>
            )

            return (
              <SelectOption
                value={String(position.id)}
                key={position.id}
                renderValue={renderValue}
                className={styles.justifyContentStart}
              >
                {renderValue}
              </SelectOption>
            )
          })}
        </Select>
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
