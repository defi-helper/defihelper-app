import { useStore } from 'effector-react'
import { useAsyncFn, useAsyncRetry, useInterval, useThrottle } from 'react-use'
import clsx from 'clsx'
import { Controller, useForm } from 'react-hook-form'

import { NumericalInput } from '~/common/numerical-input'
import { Switch } from '~/common/switch'
import { Typography } from '~/common/typography'
import { TradePercentagePicker } from '~/trade/common/trade-percentage-picker'
import { SmartTradeRouter, SmartTradeSwapHandler } from '~/common/load-adapter'
import { Icon } from '~/common/icon'
import { Button } from '~/common/button'
import { Dropdown } from '~/common/dropdown'
import { ButtonBase } from '~/common/button-base'
import { TradePlusMinus } from '~/trade/common/trade-plus-minus'
import { bignumberUtils } from '~/common/bignumber-utils'
import { Exchange, Pair } from '~/trade/common/trade.api'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { SwapOrderCallDataRouteActivationInputType } from '~/api'
import { settingsWalletModel } from '~/settings/settings-wallets'
import { TradeConfirmClaimDialog } from '~/trade/common/trade-confirm-claim-dialog'
import { useDialog } from '~/common/dialog'
import * as model from './trade-smart-order.model'
import * as styles from './trade-smart-order.css'

export type TradeSmartOrderBuyProps = {
  className?: string
  router?: SmartTradeRouter['methods']
  swap?: SmartTradeSwapHandler['methods']
  tokens?: {
    address: string
    name: string
    symbol: string
  }[]
  exchangeAddress?: string
  transactionDeadline: string
  slippage: string
  exchangesMap: Map<string, Exchange>
  currentPair?: Pair
}

type FormValues = {
  amount: string
  price: string
  total: string
  trailingBuy: boolean
  trailingBuyPercent: string
}

export const TradeSmartOrderBuy: React.VFC<TradeSmartOrderBuyProps> = (
  props
) => {
  const currentWallet = useStore(walletNetworkModel.$wallet)
  const currentUserWallet = useStore(settingsWalletModel.$currentUserWallet)

  const [openTradeConfirmDialog] = useDialog(TradeConfirmClaimDialog)

  const { handleSubmit, control, watch, setValue, formState } =
    useForm<FormValues>({
      defaultValues: {
        trailingBuy: false,
        trailingBuyPercent: '0',
        total: '0',
        amount: '0',
      },
    })
  const trailingBuy = watch('trailingBuy')
  const trailingBuyPercent = watch('trailingBuyPercent')
  const total = watch('total')
  const totalThrottled = useThrottle(total, 300)

  const balanceOf = useAsyncRetry(async () => {
    if (!props.tokens?.[0]?.address || !props.router) return

    return props.router.balanceOf(props.tokens?.[0]?.address)
  }, [props.router, props.tokens])
  const price = useAsyncRetry(async () => {
    const path = props.tokens?.map(({ address }) => address)

    if (!props.exchangeAddress || !path) return

    return props.swap?.amountOut(props.exchangeAddress, path, '1')
  }, [props.exchangeAddress, props.tokens])

  const isApproved = useAsyncRetry(async () => {
    if (!props.tokens?.[0]?.address) return false

    return props.router?.isApproved(props.tokens?.[0]?.address, totalThrottled)
  }, [props.tokens, totalThrottled])

  const [approve, handleApprove] = useAsyncFn(async () => {
    if (!props.tokens?.[0]?.address || bignumberUtils.eq(total, 0)) return false

    const res = await props.router?.approve(props.tokens?.[0]?.address, total)

    await res?.tx?.wait()

    isApproved.retry()

    return true
  }, [props.tokens, total])

  useInterval(
    () => {
      balanceOf.retry()
      price.retry()
    },
    currentWallet ? 15000 : null
  )

  const handleOnSubmit = handleSubmit(async (formValues) => {
    if (
      !props.tokens ||
      !props.exchangeAddress ||
      !currentWallet ||
      !price.value ||
      !props.router
    )
      return

    const exchange = props.exchangesMap.get(props.exchangeAddress)

    if (!currentUserWallet || !props.swap || !exchange) return

    const path = props.tokens.map(({ address }) => address)

    const [tokenAddress] = path.slice(-1)

    const token = props.currentPair?.pairInfo.tokens.find(
      ({ address }) => address.toLowerCase() === tokenAddress.toLowerCase()
    )

    try {
      await openTradeConfirmDialog({
        network: currentUserWallet.network,
        boughtPrice: price.value,
        exchange,
        tokens: props.currentPair?.pairInfo.tokens,
        name: currentUserWallet.name,
        totalRecieve: formValues.amount,
        boughtToken: token,
        firstToken: props.tokens[0]?.symbol,
        secondToken: props.tokens[1]?.symbol,
        unit: formValues.amount,
        takeProfit: formValues.total,
      })

      const result = await props.swap?.createOrder(
        props.exchangeAddress,
        path,
        formValues.total,
        null,
        null,
        {
          amountOut: formValues.amount,
          slippage: props.slippage,
          activation: null,
          moving: bignumberUtils.mul(
            formValues.amount,
            bignumberUtils.div(formValues.trailingBuyPercent, 100)
          ),
          timeout: null,
        },
        {}
      )

      if (!result) throw new Error('something went wrong')

      const tx = (await result.tx?.wait())?.transactionHash

      if (!tx) throw new Error('something went wrong')

      await model.createOrderFx({
        number: await result.getOrderNumber(),
        owner: currentUserWallet.id,
        handler: result.handler,
        callDataRaw: result.callDataRaw,
        callData: {
          exchange: result.callData.exchange,
          pair: result.callData.pair,
          path: result.callData.path,
          tokenInDecimals: result.callData.tokenInDecimals,
          tokenOutDecimals: result.callData.tokenOutDecimals,
          amountIn: result.callData.amountIn,
          stopLoss: null,
          stopLoss2: null,
          takeProfit: result.callData.takeProfit
            ? {
                amountOut: result.callData.takeProfit.amountOut,
                amountOutMin: result.callData.takeProfit.amountOutMin,
                slippage: Number(result.callData.takeProfit.slippage),
                activation: result.callData.takeProfit
                  .activation as SwapOrderCallDataRouteActivationInputType,
                timeout: result.callData.takeProfit.timeout,
              }
            : null,
          deadline: Number(bignumberUtils.mul(props.transactionDeadline, 60)),
        },
        tx,
      })
    } catch (e) {
      console.error(e)
    }
  })

  return (
    <form
      className={styles.form}
      onSubmit={handleOnSubmit}
      autoComplete="off"
      noValidate
    >
      <div className={clsx(styles.root, balanceOf.loading && styles.overflow)}>
        <div className={styles.inputGroup}>
          <Controller
            control={control}
            name="amount"
            render={({ field }) => (
              <NumericalInput
                label="Amount"
                rightSide={props.tokens?.[0]?.symbol}
                disabled={formState.isSubmitting}
                {...field}
              />
            )}
          />
          <NumericalInput
            label="Market price"
            rightSide={props.tokens?.[1]?.symbol}
            disabled
            value={price.value ?? '0'}
          />
          <div>
            <div className={styles.trailingBuyTitle}>
              <Typography
                as="div"
                variant="body3"
                className={clsx(styles.takeProfitLabel, styles.greyTitle)}
              >
                Trailing buy
              </Typography>
              <Dropdown
                control={
                  <ButtonBase>
                    <Icon icon="info" width="16" height="16" />
                  </ButtonBase>
                }
                offset={[0, 8]}
                className={styles.dropdown}
                placement="bottom-start"
              >
                <Typography variant="body2">text</Typography>
              </Dropdown>
              <Switch
                size="small"
                onChange={({ target }) =>
                  setValue('trailingBuy', target.checked)
                }
                checked={trailingBuy}
                disabled={formState.isSubmitting}
              />
            </div>
            {trailingBuy && (
              <>
                <div className={styles.trailingBuy}>
                  <Controller
                    control={control}
                    name="trailingBuyPercent"
                    render={({ field }) => (
                      <NumericalInput
                        size="small"
                        rightSide="%"
                        className={styles.trailingBuyInput}
                        disabled={formState.isSubmitting}
                        {...field}
                      />
                    )}
                  />
                  <TradePlusMinus
                    onPlus={(value) =>
                      setValue('trailingBuyPercent', String(value))
                    }
                    onMinus={(value) =>
                      setValue('trailingBuyPercent', String(value))
                    }
                    min={1}
                    max={100}
                    value={trailingBuyPercent}
                    disabled={formState.isSubmitting}
                  />
                </div>
              </>
            )}
          </div>
          <Controller
            control={control}
            name="total"
            render={({ field }) => (
              <NumericalInput
                label={
                  <>
                    Total{' '}
                    <Typography variant="inherit" className={styles.balance}>
                      Available{' '}
                      <ButtonBase
                        className={styles.balanceButton}
                        onClick={() =>
                          setValue('total', balanceOf.value ?? '0')
                        }
                        disabled={formState.isSubmitting}
                      >
                        {bignumberUtils.format(balanceOf.value)}{' '}
                        {props.tokens?.[1]?.symbol}
                      </ButtonBase>
                    </Typography>
                  </>
                }
                rightSide={props.tokens?.[1]?.symbol}
                {...field}
              />
            )}
          />
          <TradePercentagePicker
            value={total}
            available={balanceOf.value}
            onChange={(value) => setValue('total', value)}
            disabled={formState.isSubmitting}
          />
        </div>
      </div>
      <div className={styles.buttons}>
        {!isApproved.value && (
          <Button
            color="green"
            className={styles.fullWidth}
            onClick={handleApprove}
            loading={formState.isSubmitting}
          >
            Approve {props.tokens?.[0]?.symbol}
          </Button>
        )}
        <Button
          color="green"
          className={styles.fullWidth}
          type="submit"
          disabled={approve.loading || !isApproved.value}
          loading={formState.isSubmitting}
        >
          Create Order
        </Button>
      </div>
    </form>
  )
}
