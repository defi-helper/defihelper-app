import { useEffect } from 'react'
import { useAsyncFn, useAsyncRetry } from 'react-use'
import { useForm, Controller } from 'react-hook-form'

import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import { BuyLiquidity } from '~/common/load-adapter'
import { NumericalInput } from '~/common/numerical-input'
import { Select, SelectOption } from '~/common/select'
import { Typography } from '~/common/typography'
import { Loader } from '~/common/loader'
import { toastsService } from '~/toasts'
import { StakingAdapterRadio } from '~/staking/common/staking-adapter-radio'
import { ButtonBase } from '~/common/button-base'
import * as styles from './staking-buy-liquidity-dialog.css'
import { bignumberUtils } from '~/common/bignumber-utils'
import { analytics } from '~/analytics'

export type StakingBuyLiquidityDialogProps = {
  onConfirm: () => void
  onSubmit?: () => void
  buyLiquidityAdapter: BuyLiquidity
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

export const StakingBuyLiquidityDialog: React.FC<StakingBuyLiquidityDialogProps> =
  (props) => {
    const { control, handleSubmit, formState, watch, setValue } =
      useForm<FormValues>({
        defaultValues: {
          token: props.tokens?.[0]?.address,
          amount: '0',
          slippage: SLIPPAGE[1],
        },
      })

    const tokens = useAsyncRetry(async () => {
      const { balanceOf } = props.buyLiquidityAdapter.methods

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

      return props.buyLiquidityAdapter.methods.isApproved(tokenAddress, amount)
    }, [props.buyLiquidityAdapter.methods.isApproved, tokenAddress, amount])

    const [buyState, onBuy] = useAsyncFn(async (formValues: FormValues) => {
      const { buy, canBuy } = props.buyLiquidityAdapter.methods

      try {
        const can = await canBuy(formValues.token, formValues.amount)

        if (can instanceof Error) throw can
        if (!can) throw new Error("can't buy")

        const { tx } = await buy(
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
        const { approve } = props.buyLiquidityAdapter.methods

        try {
          const { tx } = await approve(formValues.token, formValues.amount)

          await tx?.wait()

          tokens.retry()

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
      if (buyState.value) {
        props.onConfirm()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [buyState.value])

    const handleOnSubmit = handleSubmit(async (formValues) => {
      analytics.log('lp_tokens_pop_up_buy_click', {
        amount: bignumberUtils.floor(formValues.amount),
      })
      if (isApproved.value === true) {
        await onBuy(formValues)
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
      const message = approveState.error?.message ?? buyState.error?.message

      if (!message) return

      toastsService.error(message)
    }, [approveState.error, buyState.error])

    useEffect(() => {
      if (isApproved.value === false || isApproved.value === undefined) return

      toastsService.info('tokens approved')
    }, [isApproved.value])

    return (
      <Dialog className={styles.root}>
        {!tokens.value ? (
          <div className={styles.loader}>
            <Loader height="36" />
          </div>
        ) : (
          <>
            <div className={styles.tabs}>
              <Typography
                variant="body3"
                transform="uppercase"
                family="mono"
                className={styles.title}
              >
                ZAP
              </Typography>
            </div>
            <div className={styles.description}>
              Buy/Sell liquidity pool tokens in one click
            </div>
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
              <Button
                type="submit"
                loading={formState.isSubmitting}
                className={styles.button}
              >
                {isApproved.value === true && 'Buy'}
                {isApproved.value === false && 'Approve'}
                {isApproved.value instanceof Error && 'Approve'}
              </Button>
            </form>
          </>
        )}
      </Dialog>
    )
  }
