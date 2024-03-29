import { useEffect, useMemo, useState } from 'react'
import { useAsync, useAsyncFn, useAsyncRetry } from 'react-use'
import { useForm, Controller } from 'react-hook-form'

import { Button } from '~/common/button'
import {
  SellLiquidity,
  SellLiquidityUniv3,
  SellLiquidityUniv3Position,
} from '~/common/load-adapter'
import { NumericalInput } from '~/common/numerical-input'
import { Select, SelectOption } from '~/common/select'
import { Typography } from '~/common/typography'
import { toastsService } from '~/toasts'
import { StakingAdapterRadio } from '~/staking/common/staking-adapter-radio'
import { ButtonBase } from '~/common/button-base'
import { bignumberUtils } from '~/common/bignumber-utils'
import { analytics } from '~/analytics'
import { Icon } from '~/common/icon'
import { Dropdown } from '~/common/dropdown'
import { Link } from '~/common/link'
import { config } from '~/config'
import * as styles from './lp-tokens-sell-form.css'
import { NULL_ADDRESS } from '~/common/constants'
import { ZapFeePayCreateInputType, ZapFeePayCreateTypeEnum } from '~/api'

export type LPTokensSellFormProps = {
  onConfirm: () => void
  onSubmit?: (variables: Omit<ZapFeePayCreateInputType, 'wallet'>) => void
  onCancel: () => void
  sellLiquidityAdapter: SellLiquidity | null
  sellLiquidityUniv3Adapter: SellLiquidityUniv3 | null
  balanceOfNative?: string
  isUniV3: boolean
  tokens: {
    logoUrl: string
    symbol: string
    address: string
  }[]
  tokenSymbol: string
}

type FormValues = {
  token: string
  amount: string
  slippage: string
}

const SLIPPAGE = ['0.1', '0.5', '1']

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

export const LPTokensSellForm: React.FC<LPTokensSellFormProps> = (props) => {
  const [error, setError] = useState<Errors | null>(null)

  const { control, handleSubmit, formState, watch, setValue } =
    useForm<FormValues>({
      defaultValues: {
        token: props.tokens?.[0]?.address,
        amount: '0',
        slippage: SLIPPAGE[1],
      },
    })

  const balance = useAsync(async () => {
    return props.sellLiquidityAdapter?.methods.balanceOf()
  }, [props.sellLiquidityAdapter?.methods])

  const { tokens: propsTokens } = props

  const tokens = useMemo(
    () =>
      propsTokens.reduce<Record<string, typeof propsTokens[number]>>(
        (acc, token) => {
          acc[token.address] = token

          return acc
        },
        {}
      ),
    [propsTokens]
  )

  const positions = useAsync(async () => {
    return props.sellLiquidityUniv3Adapter?.methods.positions().then((res) => {
      return res.reduce<Record<string, SellLiquidityUniv3Position>>(
        (acc, position) => {
          acc[position.id] = position

          return acc
        },
        {}
      )
    })
  }, [])

  const tokenAddress = watch('token')
  const amount = watch('amount')

  const fee = useAsync(async () => {
    if (!props.sellLiquidityAdapter)
      return props.sellLiquidityUniv3Adapter?.methods.fee()

    return props.sellLiquidityAdapter?.methods.fee()
  }, [props.sellLiquidityAdapter?.methods])

  const isApproved = useAsyncRetry(async () => {
    if (bignumberUtils.eq(amount, 0)) return true

    if (!props.sellLiquidityAdapter)
      return props.sellLiquidityUniv3Adapter?.methods.isApproved(tokenAddress)

    return props.sellLiquidityAdapter.methods.isApproved(amount)
  }, [props.sellLiquidityAdapter, tokenAddress, amount])

  const [sellState, onSell] = useAsyncFn(
    async (formValues: FormValues) => {
      const univ3Sell = props.sellLiquidityUniv3Adapter?.methods.sell
      const univ3SellEth = props.sellLiquidityUniv3Adapter?.methods.sellETH
      const univ3CanSell = props.sellLiquidityUniv3Adapter?.methods.canSell

      const { sell, canSell, sellETH } =
        props.sellLiquidityAdapter?.methods ?? {}

      setError(null)

      try {
        const can =
          (await univ3CanSell?.(formValues.token)) ??
          (await canSell?.(formValues.amount))

        if (can instanceof Error) throw can
        if (!can) throw new Error("can't sell")
        if (!fee.value) return

        if (bignumberUtils.gt(fee.value.native, props.balanceOfNative)) {
          setError(Errors.balance)

          return
        }

        const sellUniV3 =
          formValues.token === NULL_ADDRESS
            ? await univ3SellEth?.(
                Number(formValues.token),
                formValues.slippage
              )
            : await univ3Sell?.(
                Number(formValues.token),
                positions.value?.[formValues.token]?.token1.address as string,
                formValues.slippage
              )

        const { tx } =
          sellUniV3 ??
          (formValues.token === NULL_ADDRESS
            ? await sellETH?.(formValues.amount, formValues.slippage)
            : await sell?.(
                formValues.token,
                formValues.amount,
                formValues.slippage
              )) ??
          {}

        const result = await tx?.wait()
        analytics.log('lp_tokens_purchase_success', {
          amount: bignumberUtils.floor(formValues.amount),
        })

        if (!result?.transactionHash) return

        props.onSubmit?.({
          tx: result.transactionHash,
          fee: fee.value.native,
          feeUSD: fee.value.usd,
          type: ZapFeePayCreateTypeEnum.Sell,
        })

        return true
      } catch {
        setError(Errors.default)

        analytics.log('lp_tokens_purchase_unsuccess', {
          amount: bignumberUtils.floor(formValues.amount),
        })

        return false
      }
    },
    [fee.value, props.balanceOfNative, balance.value, positions.value]
  )

  const [approveState, onApprove] = useAsyncFn(
    async (formValues: FormValues) => {
      const univ3Approve = props.sellLiquidityUniv3Adapter?.methods.approve
      const { approve } = props.sellLiquidityAdapter?.methods ?? {}

      setError(null)

      try {
        const { tx } =
          (await univ3Approve?.(formValues.token)) ??
          (await approve?.(formValues.amount)) ??
          {}

        await tx?.wait()

        toastsService.info('tokens approved!')

        return true
      } catch {
        setError(Errors.default)

        return false
      }
    },
    []
  )

  useEffect(() => {
    if (sellState.value) {
      props.onConfirm()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sellState.value])

  const handleOnSubmit = handleSubmit(async (formValues) => {
    analytics.log('lp_tokens_pop_up_buy_click', {
      amount: bignumberUtils.floor(formValues.amount),
    })
    if (isApproved.value === true) {
      await onSell(formValues)

      return
    }

    if (isApproved.value === false || isApproved.error instanceof Error) {
      await onApprove(formValues)
    }
  })

  useEffect(() => {
    isApproved.retry()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isApproved.value, approveState.value, amount])

  useEffect(() => {
    const message = approveState.error?.message ?? sellState.error?.message

    if (!message) return setError(null)

    setError(Errors.default)
  }, [approveState.error, sellState.error])

  const amountOut = useAsync(async () => {
    if (!tokenAddress) return

    if (props.sellLiquidityUniv3Adapter) {
      return props.sellLiquidityUniv3Adapter.methods.amountOut(
        Number(tokenAddress),
        positions.value?.[tokenAddress].token1.address as string
      )
    }

    return props.sellLiquidityAdapter?.methods.amountOut(tokenAddress, amount)
  }, [props.sellLiquidityAdapter, tokenAddress, amount, positions.value])

  useEffect(() => {
    if (!balance.value) return

    setValue('amount', balance.value)
  }, [balance.value, setValue])

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={handleOnSubmit}
      className={styles.form}
    >
      <Controller
        control={control}
        name="amount"
        render={({ field }) => (
          <>
            <NumericalInput
              {...field}
              label={
                props.isUniV3 ? null : (
                  <>
                    Amount{' '}
                    <ButtonBase
                      className={styles.balance}
                      onClick={() => setValue('amount', balance.value ?? '0')}
                    >
                      {bignumberUtils.format(balance.value)} MAX
                    </ButtonBase>
                  </>
                )
              }
              value={field.value}
              className={styles.input}
              disabled={formState.isSubmitting}
              error={isApproved.value instanceof Error}
              helperText={
                isApproved.value instanceof Error
                  ? isApproved.value.message
                  : undefined
              }
            />
          </>
        )}
      />
      <Controller
        control={control}
        name="token"
        render={({ field }) => (
          <Select
            {...field}
            label="You will get (approximately)"
            leftSide={
              <span className={styles.amountOut}>
                ≈ {bignumberUtils.format(amountOut.value)}
              </span>
            }
            value={field.value}
            className={styles.input}
            disabled={formState.isSubmitting}
            error={Boolean(tokens.error)}
          >
            {props.isUniV3
              ? Object.values(positions.value ?? {}).map((option) => {
                  return (
                    <SelectOption key={option.id} value={String(option.id)}>
                      <span className={styles.imgPlaceHolder} />
                      {option.token0.price.lower} - {option.token0.price.upper}{' '}
                      per {option.token1.symbol} - $
                      {bignumberUtils.format(
                        bignumberUtils.plus(
                          option.token0.amountUSD,
                          option.token1.amountUSD
                        )
                      )}
                    </SelectOption>
                  )
                })
              : Object.values(tokens ?? {}).map((option) => {
                  return (
                    <SelectOption key={option.address} value={option.address}>
                      {option.logoUrl ? (
                        <img
                          src={option.logoUrl}
                          className={styles.img}
                          alt=""
                        />
                      ) : (
                        <span className={styles.imgPlaceHolder} />
                      )}
                      {option.symbol}
                    </SelectOption>
                  )
                })}
          </Select>
        )}
      />
      <Controller
        control={control}
        name="slippage"
        render={({ field }) => (
          <div>
            <Typography
              as="div"
              variant="body2"
              family="mono"
              transform="uppercase"
              className={styles.label}
            >
              Slippage
            </Typography>
            {SLIPPAGE.map((option) => (
              <StakingAdapterRadio
                key={option}
                {...field}
                value={option}
                className={styles.radio}
                disabled={formState.isSubmitting}
              >
                {option}%
              </StakingAdapterRadio>
            ))}
          </div>
        )}
      />
      <div className={styles.wrap}>
        {error ? (
          <Typography variant="body3" as="div" className={styles.error}>
            {ErrorMessages[error]}
          </Typography>
        ) : (
          <div className={styles.serviceFee}>
            <Typography
              transform="uppercase"
              family="mono"
              variant="body3"
              as="div"
              className={styles.serviceFeeTitle}
            >
              <Typography variant="inherit">service fee</Typography>
              <Dropdown
                control={
                  <ButtonBase>
                    <Icon icon="question" width={14} height={14} />
                  </ButtonBase>
                }
                className={styles.serviceFeeDropdown}
                placement="bottom-start"
                offset={[0, 4]}
              >
                <Typography variant="body3">
                  We will charge you ${bignumberUtils.format(fee.value?.usd)}{' '}
                  fee for this operation. This revenue will be distributed to
                  DFH Governance token holders.{' '}
                  <Link
                    color="blue"
                    href={`${config.MAIN_URL}tokenomics`}
                    target="_blank"
                  >
                    Read more about DFH token
                  </Link>
                </Typography>
              </Dropdown>
            </Typography>
            <Typography variant="body2">
              {bignumberUtils.format(fee.value?.native, 3)} {props.tokenSymbol}{' '}
              ($
              {bignumberUtils.format(fee.value?.usd)})
            </Typography>
          </div>
        )}
        <Button type="submit" loading={formState.isSubmitting}>
          {isApproved.value === true && 'Sell'}
          {isApproved.value === false && 'Approve'}
          {isApproved.value instanceof Error && 'Approve'}
        </Button>
        <Button variant="outlined" onClick={props.onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
