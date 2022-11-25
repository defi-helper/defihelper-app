import { useEffect, useState } from 'react'
import { useAsync, useAsyncFn, useAsyncRetry } from 'react-use'
import { useForm, Controller } from 'react-hook-form'

import { Button } from '~/common/button'
import { BuyLiquidity } from '~/common/load-adapter'
import { NumericalInput } from '~/common/numerical-input'
import { Select, SelectOption } from '~/common/select'
import { Typography } from '~/common/typography'
import { Loader } from '~/common/loader'
import { toastsService } from '~/toasts'
import { StakingAdapterRadio } from '~/staking/common/staking-adapter-radio'
import { ButtonBase } from '~/common/button-base'
import { Icon } from '~/common/icon'
import { Dropdown } from '~/common/dropdown'
import { Link } from '~/common/link'
import { bignumberUtils } from '~/common/bignumber-utils'
import { analytics } from '~/analytics'
import { config } from '~/config'
import { NULL_ADDRESS } from '~/common/constants'
import { ZapFeePayCreateInputType, ZapFeePayCreateTypeEnum } from '~/api'
import * as styles from './lp-tokens-buy-form.css'

export type LPTokensBuyFormProps = {
  onConfirm: () => void
  onSubmit?: (variables: Omit<ZapFeePayCreateInputType, 'wallet'>) => void
  onCancel: () => void
  buyLiquidityAdapter: BuyLiquidity
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

export const LPTokensBuyForm: React.FC<LPTokensBuyFormProps> = (props) => {
  const [error, setError] = useState<Errors | null>(null)

  const { control, handleSubmit, formState, watch, setValue } =
    useForm<FormValues>({
      defaultValues: {
        token: props.tokens?.[0]?.address,
        amount: '0',
        slippage: SLIPPAGE[1],
      },
    })

  const tokens = useAsyncRetry(async () => {
    const { balanceOf, balanceETHOf } = props.buyLiquidityAdapter.methods

    const tokensWithBalances = await Promise.all(
      props.tokens.map(async (token) => {
        try {
          return {
            ...token,
            balance:
              token.address === NULL_ADDRESS
                ? await balanceETHOf()
                : await balanceOf(token.address),
          }
        } catch (err) {
          if (!(err instanceof Error))
            return {
              ...token,
              balance: null,
            }

          return {
            ...token,
            error: err.message,
            balance: null,
          }
        }
      })
    )

    return tokensWithBalances.reduce<
      Record<string, typeof tokensWithBalances[number]>
    >((acc, token) => {
      acc[token.address] = token

      return acc
    }, {})
  }, [props.tokens])

  const tokenAddress = watch('token')
  const amount = watch('amount')

  const fee = useAsync(props.buyLiquidityAdapter.methods.fee, [
    props.buyLiquidityAdapter.methods,
  ])

  useEffect(() => {
    const currentToken = tokens.value?.[tokenAddress]

    if (!currentToken?.balance) return

    setValue('amount', currentToken.balance)
  }, [tokenAddress, tokens.value, setValue])

  const isApproved = useAsyncRetry(async () => {
    if (bignumberUtils.eq(amount, 0)) return true

    return props.buyLiquidityAdapter.methods.isApproved(tokenAddress, amount)
  }, [props.buyLiquidityAdapter.methods.isApproved, tokenAddress, amount])

  const [buyState, onBuy] = useAsyncFn(
    async (formValues: FormValues) => {
      const { buy, canBuy, buyETH, canBuyETH } =
        props.buyLiquidityAdapter.methods

      setError(null)

      const isNativeToken = formValues.token === NULL_ADDRESS

      try {
        const can = isNativeToken
          ? await canBuyETH(formValues.amount)
          : await canBuy(formValues.token, formValues.amount)

        if (can instanceof Error) throw can
        if (!can) throw new Error("can't buy")

        const { tx } = isNativeToken
          ? await buyETH(formValues.amount, formValues.slippage)
          : await buy(formValues.token, formValues.amount, formValues.slippage)

        const result = await tx?.wait()
        analytics.log('lp_tokens_purchase_success', {
          amount: bignumberUtils.floor(formValues.amount),
        })

        if (!result?.transactionHash || !fee.value) return

        if (
          bignumberUtils.gt(
            fee.value.native,
            tokens.value?.[formValues.token]?.balance
          )
        ) {
          setError(Errors.balance)

          return
        }

        props.onSubmit?.({
          tx: result.transactionHash,
          fee: fee.value.native,
          feeUSD: fee.value.usd,
          type: ZapFeePayCreateTypeEnum.Buy,
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
    [fee.value, tokens.value]
  )

  const [approveState, onApprove] = useAsyncFn(
    async (formValues: FormValues) => {
      const { approve } = props.buyLiquidityAdapter.methods
      setError(null)

      try {
        const { tx } = await approve(formValues.token, formValues.amount)

        await tx?.wait()

        tokens.retry()
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
    if (buyState.value) {
      props.onConfirm()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buyState.value])

  const handleOnSubmit = handleSubmit(async (formValues) => {
    analytics.log('lp_tokens_pop_up_buy_click', {
      amount: bignumberUtils.floor(formValues.amount),
    })
    if (isApproved.value === true || formValues.token === NULL_ADDRESS) {
      await onBuy(formValues)

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
    const message = approveState.error?.message ?? buyState.error?.message

    if (!message) return setError(null)

    setError(Errors.default)
  }, [approveState.error, buyState.error])

  return (
    <>
      {tokens.loading ? (
        <div className={styles.loader}>
          <Loader height="36" />
        </div>
      ) : (
        <>
          <form
            noValidate
            autoComplete="off"
            onSubmit={handleOnSubmit}
            className={styles.form}
          >
            <Controller
              control={control}
              name="token"
              render={({ field }) => (
                <Select
                  {...field}
                  label="Token"
                  value={field.value}
                  className={styles.input}
                  disabled={formState.isSubmitting}
                  error={Boolean(tokens.error)}
                  helperText={tokens.error?.message}
                >
                  {Object.values(tokens.value ?? {}).map((option) => {
                    const renderValue = (
                      <>
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
                      </>
                    )

                    return (
                      <SelectOption
                        key={option.address}
                        value={option.address}
                        renderValue={renderValue}
                      >
                        {renderValue}
                        <Typography
                          variant="inherit"
                          className={styles.tokenBalance}
                        >
                          {option.balance}
                        </Typography>
                      </SelectOption>
                    )
                  })}
                </Select>
              )}
            />
            <Controller
              control={control}
              name="amount"
              render={({ field }) => (
                <>
                  <NumericalInput
                    {...field}
                    label={
                      <>
                        Amount{' '}
                        <ButtonBase
                          className={styles.balance}
                          onClick={() =>
                            setValue(
                              'amount',
                              tokens.value?.[tokenAddress]?.balance ?? '0'
                            )
                          }
                        >
                          {tokens.value?.[tokenAddress]?.balance} MAX
                        </ButtonBase>
                      </>
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
                        We will charge you $
                        {bignumberUtils.format(fee.value?.usd)} fee for this
                        operation. This revenue will be distributed to DFH
                        Governance token holders.{' '}
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
                    {bignumberUtils.format(fee.value?.native, 3)}{' '}
                    {props.tokenSymbol} ($
                    {bignumberUtils.format(fee.value?.usd)})
                  </Typography>
                </div>
              )}
              <Button type="submit" loading={formState.isSubmitting}>
                {(isApproved.value === true || tokenAddress === NULL_ADDRESS) &&
                  'Buy'}
                {isApproved.value === false &&
                  tokenAddress !== NULL_ADDRESS &&
                  'Approve'}
                {isApproved.value instanceof Error &&
                  tokenAddress !== NULL_ADDRESS &&
                  'Approve'}
              </Button>
              <Button variant="outlined" onClick={props.onCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </>
      )}
    </>
  )
}
