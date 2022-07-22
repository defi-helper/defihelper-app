import { useEffect } from 'react'
import { useAsyncFn, useAsyncRetry } from 'react-use'
import { useForm, Controller } from 'react-hook-form'

import { Button } from '~/common/button'
import { SellLiquidity } from '~/common/load-adapter'
import { NumericalInput } from '~/common/numerical-input'
import { Select, SelectOption } from '~/common/select'
import { Typography } from '~/common/typography'
import { Loader } from '~/common/loader'
import { toastsService } from '~/toasts'
import { StakingAdapterRadio } from '~/staking/common/staking-adapter-radio'
import { ButtonBase } from '~/common/button-base'
import { bignumberUtils } from '~/common/bignumber-utils'
import { analytics } from '~/analytics'
import * as styles from './lp-tokens-sell-form.css'

export type LPTokensSellFormProps = {
  onConfirm: () => void
  onSubmit?: () => void
  onCancel: () => void
  sellLiquidityAdapter: SellLiquidity
  tokens: {
    logoUrl: string
    symbol: string
    address: string
  }[]
}

type FormValues = {
  token: string
  amount: string
  slippage: string
}

const SLIPPAGE = ['0.1', '0.5', '1']

export const LPTokensSellForm: React.FC<LPTokensSellFormProps> = (props) => {
  const { control, handleSubmit, formState, watch, setValue } =
    useForm<FormValues>({
      defaultValues: {
        token: props.tokens?.[0]?.address,
        amount: '0',
        slippage: SLIPPAGE[1],
      },
    })

  const tokens = useAsyncRetry(async () => {
    const { balanceOf } = props.sellLiquidityAdapter.methods

    const tokensWithBalances = await Promise.all(
      props.tokens.map(async (token) => ({
        ...token,
        balance: await balanceOf(),
      }))
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

  useEffect(() => {
    const currentToken = tokens.value?.[tokenAddress]

    if (!currentToken) return

    setValue('amount', currentToken.balance)
  }, [tokenAddress, tokens.value, setValue])

  const isApproved = useAsyncRetry(async () => {
    if (bignumberUtils.eq(amount, 0)) return true

    return props.sellLiquidityAdapter.methods.isApproved(amount)
  }, [props.sellLiquidityAdapter.methods.isApproved, tokenAddress, amount])

  const [sellState, onSell] = useAsyncFn(async (formValues: FormValues) => {
    const { sell, canSell } = props.sellLiquidityAdapter.methods

    try {
      const can = await canSell(formValues.amount)

      if (can instanceof Error) throw can
      if (!can) throw new Error("can't buy")

      const { tx } = await sell(
        formValues.token,
        formValues.amount,
        formValues.slippage
      )

      await tx?.wait()
      analytics.log('lp_tokens_purchase_success', {
        amount: bignumberUtils.floor(formValues.amount),
      })

      return true
    } catch (error) {
      if (error instanceof Error) {
        toastsService.error(error.message)
      }

      analytics.log('lp_tokens_purchase_unsuccess', {
        amount: bignumberUtils.floor(formValues.amount),
      })

      return false
    }
  }, [])

  const [approveState, onApprove] = useAsyncFn(
    async (formValues: FormValues) => {
      const { approve } = props.sellLiquidityAdapter.methods

      try {
        const { tx } = await approve(formValues.amount)

        await tx?.wait()

        tokens.retry()
        toastsService.info('tokens approved!')

        return true
      } catch (error) {
        if (error instanceof Error) {
          toastsService.error(error.message)
        }

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
    }

    if (isApproved.value === false || isApproved.error instanceof Error) {
      await onApprove(formValues)
    }
  })

  useEffect(() => {
    if (isApproved.value === false) {
      isApproved.retry()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isApproved.value, approveState.value, amount])

  useEffect(() => {
    const message = approveState.error?.message ?? sellState.error?.message

    if (!message) return

    toastsService.error(message)
  }, [approveState.error, sellState.error])

  return (
    <>
      {!tokens.value ? (
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
              name="token"
              render={({ field }) => (
                <Select
                  {...field}
                  label="You will get"
                  value={field.value}
                  className={styles.input}
                  disabled={formState.isSubmitting}
                  error={Boolean(tokens.error)}
                  helperText={tokens.error?.message}
                >
                  {Object.values(tokens.value ?? {}).map((option) => (
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
                  ))}
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
            <Button
              type="submit"
              loading={formState.isSubmitting}
              className={styles.button}
            >
              {isApproved.value === true && 'Sell'}
              {isApproved.value === false && 'Approve'}
              {isApproved.value instanceof Error && 'Approve'}
            </Button>
            <Button variant="outlined" onClick={props.onCancel}>
              Cancel
            </Button>
          </form>
        </>
      )}
    </>
  )
}
