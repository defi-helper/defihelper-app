import clsx from 'clsx'
import { Controller, useForm } from 'react-hook-form'

import { NumericalInput } from '~/common/numerical-input'
import { Switch } from '~/common/switch'
import { Typography } from '~/common/typography'
import { TradeInput } from '~/trade/common/trade-input'
import { TradeSlider } from '~/trade/common/trade-slider'
import { TradePercentagePicker } from '~/trade/common/trade-percentage-picker'
import { config } from '~/config'
import { SmartTradeRouter, SmartTradeSwapHandler } from '~/common/load-adapter'
import { Icon } from '~/common/icon'
import { Button } from '~/common/button'
import * as styles from './trade-buy-sell.css'

export type TradeBuySellProps = {
  className?: string
  router?: SmartTradeRouter['methods']
  swap?: SmartTradeSwapHandler['methods']
  tokens?: {
    address: string
    name: string
    symbol: string
  }[]
}

type FormValues = {
  amount: string
  price: string
  total: string
  takeProfit: boolean
  stopLoss: boolean
}

export const TradeBuySell: React.VFC<TradeBuySellProps> = (props) => {
  const { handleSubmit, control, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      takeProfit: false,
      stopLoss: false,
    },
  })

  const handleOnSubmit = handleSubmit(() => {})

  const takeProfit = watch('takeProfit')
  const stopLoss = watch('stopLoss')

  return (
    <form className={styles.form} onSubmit={handleOnSubmit}>
      <div className={clsx(styles.root, !config.IS_DEV && styles.overflow)}>
        <div className={styles.inputGroup}>
          <Controller
            control={control}
            name="amount"
            render={({ field }) => (
              <NumericalInput
                label="Amount"
                rightSide={props.tokens?.[0]?.symbol}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="price"
            render={({ field }) => (
              <NumericalInput
                label="Market price"
                rightSide={props.tokens?.[1]?.symbol}
                {...field}
              />
            )}
          />
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
          <TradePercentagePicker />
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.trailingBuyTitle}>
            <Typography as="div" className={styles.takeProfitLabel}>
              Take profit
            </Typography>
            <Switch
              size="small"
              onChange={({ target }) => setValue('takeProfit', target.checked)}
              checked={takeProfit}
            />
          </div>
          {takeProfit && (
            <>
              <NumericalInput rightSide={props.tokens?.[1]?.symbol} />
              <div className={styles.trailingBuy}>
                <TradeInput
                  className={styles.trailingBuyInput}
                  negativeOrPositive
                  rightSide={<>%</>}
                />
                <TradeSlider className={styles.slider} />
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
              onChange={({ target }) => setValue('stopLoss', target.checked)}
              checked={stopLoss}
            />
          </div>
          {stopLoss && (
            <>
              <NumericalInput rightSide={props.tokens?.[1]?.symbol} />
              <div className={styles.trailingBuy}>
                <TradeInput
                  className={styles.trailingBuyInput}
                  negativeOrPositive
                  rightSide={<>%</>}
                />
                <TradeSlider className={styles.slider} reverse />
              </div>
            </>
          )}
        </div>
      </div>
      <div className={styles.buttons}>
        <Typography
          className={styles.approveTransactions}
          variant="body3"
          as="div"
        >
          Approve transactions <Icon icon="info" width="1em" height="1em" />
        </Typography>
        <Button color="green" className={styles.fullWidth}>
          Approve {props.tokens?.map(({ symbol }) => symbol).join('-')}
        </Button>
        <Button color="green" className={styles.fullWidth} type="submit">
          Create Order
        </Button>
      </div>
    </form>
  )
}
