import { useToggle } from 'react-use'
import clsx from 'clsx'

import { NumericalInput } from '~/common/numerical-input'
import { Switch } from '~/common/switch'
import { Typography } from '~/common/typography'
import { TradeInput } from '~/trade/common/trade-input'
import { TradeSlider } from '~/trade/common/trade-slider'
import { TradePercentagePicker } from '~/trade/common/trade-percentage-picker'
import { config } from '~/config'
import { SmartTradeRouter, SmartTradeSwapHandler } from '~/common/load-adapter'
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

export const TradeBuySell: React.VFC<TradeBuySellProps> = (props) => {
  const [takeProfit, toggleTakeProfit] = useToggle(false)
  const [stopLoss, toggleStopLoss] = useToggle(false)

  return (
    <div className={clsx(styles.root, !config.IS_DEV && styles.overflow)}>
      <div className={styles.inputGroup}>
        <NumericalInput label="Amount" rightSide={props.tokens?.[0]?.symbol} />
        <NumericalInput
          label="Market price"
          rightSide={props.tokens?.[1]?.symbol}
        />
        <NumericalInput label="Total" rightSide={props.tokens?.[1]?.symbol} />
        <TradePercentagePicker />
      </div>
      <div className={styles.inputGroup}>
        <div className={styles.trailingBuyTitle}>
          <Typography as="div" className={styles.takeProfitLabel}>
            Take profit
          </Typography>
          <Switch
            size="small"
            onChange={toggleTakeProfit}
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
          <Switch size="small" onChange={toggleStopLoss} checked={stopLoss} />
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
  )
}
