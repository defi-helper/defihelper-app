/* eslint-disable no-unused-vars */
import { useEffect } from 'react'
import { useAsyncFn, useAsyncRetry } from 'react-use'
import { useForm, Controller } from 'react-hook-form'
import clsx from 'clsx'

import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import { BuyLiquidity } from '~/common/load-adapter'
import { NumericalInput } from '~/common/numerical-input'
import { Select, SelectOption } from '~/common/select'
import { Typography } from '~/common/typography'
import { Loader } from '~/common/loader'
import { toastsService } from '~/toasts'
import { StakingAdapterRadio } from '~/staking/common/staking-adapter-radio'
import * as styles from './staking-buy-liquidity-dialog.css'

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
      const { isApprove } = props.buyLiquidityAdapter.methods

      return isApprove(tokenAddress, amount)
    }, [props.buyLiquidityAdapter.methods.isApprove, tokenAddress, amount])

    const [buyState, onBuy] = useAsyncFn(async (formValues: FormValues) => {
      const { buy } = props.buyLiquidityAdapter.methods

      try {
        const { tx } = await buy(
          formValues.token,
          formValues.amount,
          formValues.slippage
        )

        await tx?.wait()

        return true
      } catch (error) {
        if (error instanceof Error) {
          toastsService.error(error.message)
        }

        return false
      }
    }, [])

    const [approveState, onApprove] = useAsyncFn(
      async (formValues: FormValues) => {
        const { approve } = props.buyLiquidityAdapter.methods

        try {
          const { tx } = await approve(formValues.token, formValues.amount)

          await tx?.wait()
        } catch (error) {
          if (error instanceof Error) {
            toastsService.error(error.message)
          }
        }
      },
      []
    )

    const handleOnSubmit = handleSubmit(async (formValues) => {
      const isApproveBool = typeof isApproved.value === 'boolean'

      if (isApproveBool && isApproved.value) {
        await onBuy(formValues)
      }

      if (!isApproved.value) {
        await onApprove(formValues)
      }
    })

    useEffect(() => {
      if (
        typeof isApproved.value === 'boolean' &&
        isApproved.value &&
        formState.isSubmitSuccessful
      ) {
        isApproved.retry()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isApproved.value, formState.isSubmitSuccessful])

    useEffect(() => {
      if (!buyState.value) return

      toastsService.success('success!')
    }, [buyState.value])

    useEffect(() => {
      const message = approveState.error?.message ?? buyState.error?.message

      if (!message) return

      toastsService.error(message)
    }, [approveState.error, buyState.error])

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
                className={clsx(styles.title, styles.activeTab)}
              >
                {props.buyLiquidityAdapter.name}
              </Typography>
            </div>
            <div className={styles.description}>some description</div>
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
                        <span className={styles.balance}>{option.balance}</span>
                      </SelectOption>
                    ))}
                  </Select>
                )}
              />
              <Controller
                control={control}
                name="amount"
                render={({ field }) => (
                  <NumericalInput
                    {...field}
                    label="Amount"
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
                {typeof isApproved.value === 'boolean' ? 'Buy' : 'Approve'}
              </Button>
            </form>
          </>
        )}
      </Dialog>
    )
  }