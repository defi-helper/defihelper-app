import { useStore } from 'effector-react'
import { Controller, useForm } from 'react-hook-form'
import clsx from 'clsx'
import { useAsyncFn, useAsyncRetry } from 'react-use'
import { useEffect } from 'react'

import { bignumberUtils } from '~/common/bignumber-utils'
import { ButtonBase } from '~/common/button-base'
import { NumericalInput } from '~/common/numerical-input'
import { Typography } from '~/common/typography'
import { Switch } from '~/common/switch'
import { TradeInput } from '~/trade/common/trade-input'
import { TradeSlider } from '~/trade/common/trade-slider'
import { TradePercentagePicker } from '~/trade/common/trade-percentage-picker'
import { SmartTradeRouter, SmartTradeSwapHandler } from '~/common/load-adapter'
import { Button } from '~/common/button'
import { config } from '~/config'
import { WalletConnect } from '~/wallets/wallet-connect'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { settingsWalletModel } from '~/settings/settings-wallets'
import * as styles from './trade-smart-sell.css'
import * as model from './trade-smart-sell.model'

export type TradeSmartSellProps = {
  className?: string
  router?: SmartTradeRouter['methods']
  swap?: SmartTradeSwapHandler['methods']
  tokens?: {
    address: string
    name: string
    symbol: string
  }[]
  price?: number
  exchangeAddress?: string
  transactionDeadline: string
  slippage: string
}

type FormValues = {
  unit: string
  price: string
  total: string
  takeProfit: boolean
  stopLoss: boolean
  stopLossPercent: number
  takeProfitPercent: number
  takeProfitValue: string
  stopLossValue: string
}

export const TradeSmartSell: React.VFC<TradeSmartSellProps> = (props) => {
  const currentWallet = useStore(walletNetworkModel.$wallet)
  const wallets = useStore(settingsWalletModel.$wallets)

  const { handleSubmit, control, watch, setValue, formState } =
    useForm<FormValues>({
      defaultValues: {
        takeProfit: false,
        stopLoss: false,
        takeProfitPercent: 10,
        stopLossPercent: 4,
      },
    })

  const takeProfit = watch('takeProfit')
  const stopLoss = watch('stopLoss')

  const balanceOf = useAsyncRetry(async () => {
    if (!props.tokens?.[0]?.address || !props.router) return

    return props.router.balanceOf(props.tokens?.[0]?.address)
  }, [props.router, props.tokens])

  const unit = watch('unit')
  const price = watch('price')
  const takeProfitPercent = watch('takeProfitPercent')
  const stopLossPercent = watch('stopLossPercent')
  const total = watch('total')

  useEffect(() => {
    setValue(
      'total',
      bignumberUtils.toFixed(bignumberUtils.mul(unit, price), 6)
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit, price])

  useEffect(() => {
    setValue('price', bignumberUtils.toFixed(String(props.price ?? '0'), 6))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.price])

  const isApproved = useAsyncRetry(async () => {
    if (!props.tokens?.[0]?.address || bignumberUtils.eq(unit, 0)) return false

    return props.router?.isApproved(props.tokens?.[0]?.address, unit)
  }, [props.tokens, unit])

  const [approve, handleApprove] = useAsyncFn(async () => {
    if (!props.tokens?.[0]?.address || bignumberUtils.eq(unit, 0)) return false

    await props.router?.approve(props.tokens?.[0]?.address, unit)

    isApproved.retry()

    return true
  }, [props.tokens, unit])

  const handleChangeStopLoss = (event: number | number[]) => {
    setValue('stopLossPercent', Number(event))
  }

  const handleChangeTakeProfit = (event: number | number[]) => {
    setValue('takeProfitPercent', Number(event))
  }

  const handleOnSubmit = handleSubmit(async (formValues) => {
    if (!props.tokens || !props.exchangeAddress || !currentWallet) return

    const findedWallet = wallets.find((wallet) => {
      const sameAddreses =
        String(currentWallet.chainId) === 'main'
          ? currentWallet.account === wallet.address
          : currentWallet.account?.toLowerCase() === wallet.address

      return sameAddreses && String(currentWallet.chainId) === wallet.network
    })

    if (!findedWallet) return

    const path = props.tokens.map(({ address }) => address)

    const getAmountOut = (percent: number) =>
      bignumberUtils.toFixed(
        bignumberUtils.plus(
          bignumberUtils.mul(bignumberUtils.div(percent, 100), total),
          total
        ),
        6
      )

    try {
      const result = await props.swap?.createOrder(
        props.exchangeAddress,
        path,
        formValues.unit,
        formValues.stopLoss
          ? {
              amountOut: getAmountOut(stopLossPercent),
              slippage: props.slippage,
            }
          : null,
        formValues.takeProfit
          ? {
              amountOut: getAmountOut(takeProfitPercent),
              slippage: props.slippage,
            }
          : null,
        { token: formValues.unit }
      )

      if (!result) throw new Error('something went wrong')

      const tx = (await result.tx?.wait())?.transactionHash

      if (!tx) throw new Error('something went wrong')

      await model.createOrderFx({
        number: await result.getOrderNumber(),
        owner: findedWallet.id,
        handler: result.handler,
        callDataRaw: result.callDataRaw,
        callData: {
          exchange: result.callData.exchange,
          path: result.callData.path,
          tokenInDecimals: result.callData.tokenInDecimals,
          tokenOutDecimals: result.callData.tokenOutDecimals,
          pair: result.callData.pair,
          amountIn: result.callData.amountIn,
          boughtPrice: formValues.price,
          deadline: Number(bignumberUtils.mul(props.transactionDeadline, 60)),
        },
        tx,
      })
    } catch (e) {
      console.error(e)
    }
  })

  const takeProfitValue = watch('takeProfitValue')
  const stopLossValue = watch('stopLossValue')

  useEffect(() => {
    setValue(
      'takeProfitValue',
      bignumberUtils.toFixed(
        bignumberUtils.plus(
          bignumberUtils.mul(bignumberUtils.div(takeProfitPercent, 100), price),
          price
        ),
        6
      )
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price, takeProfitPercent])
  useEffect(() => {
    setValue(
      'stopLossValue',
      bignumberUtils.toFixed(
        bignumberUtils.minus(
          price,
          bignumberUtils.mul(bignumberUtils.div(stopLossPercent, 100), price)
        ),
        6
      )
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price, stopLossPercent])

  const handleChangeTakeProfitValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue(
      'takeProfitPercent',
      Number(
        bignumberUtils.toFixed(
          bignumberUtils.div(
            event.currentTarget.value,
            bignumberUtils.mul(total, 99)
          ),
          2
        )
      )
    )
  }
  const handleChangeStopLossValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue(
      'stopLossPercent',
      Number(
        bignumberUtils.toFixed(
          bignumberUtils.div(
            event.currentTarget.value,
            bignumberUtils.mul(total, 100)
          ),
          2
        )
      )
    )
  }

  return (
    <form className={styles.form} onSubmit={handleOnSubmit}>
      <div
        className={clsx(
          styles.root,
          (!config.IS_DEV || balanceOf.loading) && styles.overflow
        )}
      >
        <div className={styles.inputGroup}>
          <Controller
            name="unit"
            control={control}
            render={({ field }) => (
              <NumericalInput
                label={
                  <>
                    Unit{' '}
                    <Typography variant="inherit" className={styles.balance}>
                      Available{' '}
                      <ButtonBase
                        className={styles.balanceButton}
                        onClick={() => setValue('unit', balanceOf.value ?? '0')}
                      >
                        {bignumberUtils.format(balanceOf.value)}{' '}
                        {props.tokens?.[0]?.symbol}
                      </ButtonBase>
                    </Typography>
                  </>
                }
                rightSide={props.tokens?.[0]?.symbol}
                {...field}
              />
            )}
          />
          <TradePercentagePicker
            value={unit}
            available={balanceOf.value}
            onChange={(value) => setValue('unit', value)}
          />
          <div>
            <Controller
              control={control}
              name="price"
              render={({ field }) => (
                <NumericalInput
                  label="Bought price"
                  rightSide={props.tokens?.[1]?.symbol}
                  {...field}
                />
              )}
            />
            <Typography
              variant="body3"
              as="div"
              align="center"
              className={styles.currentPrice}
            >
              Current Price:{' '}
              <ButtonBase className={styles.currentPriceButton}>
                {bignumberUtils.format(props.price)} USDT
              </ButtonBase>
            </Typography>
          </div>
          <Controller
            control={control}
            name="total"
            render={({ field }) => (
              <NumericalInput
                label="Total"
                rightSide={props.tokens?.[1]?.symbol}
                {...field}
              />
            )}
          />
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.trailingBuyTitle}>
            <Typography as="div" className={styles.takeProfitLabel}>
              Take profit
            </Typography>
            <Switch
              size="small"
              checked={takeProfit}
              onChange={({ target }) => setValue('takeProfit', target.checked)}
            />
          </div>
          {takeProfit && (
            <>
              <NumericalInput
                rightSide={props.tokens?.[1]?.symbol}
                value={takeProfitValue}
                onChange={handleChangeTakeProfitValue}
              />
              <div className={styles.trailingBuy}>
                <TradeInput
                  className={styles.trailingBuyInput}
                  negativeOrPositive
                  rightSide={<>%</>}
                  value={takeProfitPercent}
                  readOnly
                />
                <TradeSlider
                  className={styles.slider}
                  value={takeProfitPercent}
                  min={0}
                  max={300}
                  onChange={handleChangeTakeProfit}
                />
              </div>
            </>
          )}
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.trailingBuyTitle}>
            <Typography as="div" className={styles.takeProfitLabel}>
              Stop Loss
            </Typography>
            <Switch
              size="small"
              checked={stopLoss}
              onChange={({ target }) => setValue('stopLoss', target.checked)}
            />
          </div>
          {stopLoss && (
            <>
              <NumericalInput
                rightSide={props.tokens?.[1]?.symbol}
                value={stopLossValue}
                onChange={handleChangeStopLossValue}
              />
              <div className={styles.trailingBuy}>
                <TradeInput
                  className={styles.trailingBuyInput}
                  negativeOrPositive
                  value={-stopLossPercent}
                  readOnly
                  rightSide={<>%</>}
                />
                <TradeSlider
                  className={styles.slider}
                  reverse
                  value={stopLossPercent}
                  min={0}
                  max={99}
                  onChange={handleChangeStopLoss}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <div className={styles.buttons}>
        {!isApproved.value && bignumberUtils.gt(unit, 0) && (
          <>
            <WalletConnect
              fallback={
                <Button color="green" className={styles.fullWidth}>
                  Approve {props.tokens?.[0]?.symbol}
                </Button>
              }
            >
              <Button
                color="green"
                className={styles.fullWidth}
                onClick={handleApprove}
                loading={approve.loading}
              >
                Approve {props.tokens?.[0]?.symbol}
              </Button>
            </WalletConnect>
          </>
        )}
        <WalletConnect
          fallback={
            <Button color="green" className={styles.fullWidth}>
              Create Order
            </Button>
          }
        >
          <Button
            color="green"
            className={styles.fullWidth}
            type="submit"
            loading={formState.isSubmitting}
            disabled={!isApproved.value || (!takeProfit && !stopLoss)}
          >
            Create Order
          </Button>
        </WalletConnect>
      </div>
    </form>
  )
}
