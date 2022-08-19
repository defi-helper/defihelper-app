import { useToggle } from 'react-use'

import { bignumberUtils } from '~/common/bignumber-utils'
import { ButtonBase } from '~/common/button-base'
import { NumericalInput } from '~/common/numerical-input'
import { Typography } from '~/common/typography'
import { Switch } from '~/common/switch'
import { TradeInput } from '~/trade/common/trade-input'
import { TradeSlider } from '~/trade/common/trade-slider'
import { TradePercentagePicker } from '~/trade/common/trade-percentage-picker'
import { SmartTradeRouter, SmartTradeSwapHandler } from '~/common/load-adapter'
import * as styles from './trade-smart-sell.css'

export type TradeSmartSellProps = {
  className?: string
  router?: SmartTradeRouter['methods']
  swap?: SmartTradeSwapHandler['methods']
  tokens?: {
    address: string
    name: string
    symbol: string
  }[]
}

export const TradeSmartSell: React.VFC<TradeSmartSellProps> = (props) => {
  const [takeProfit, toggleTakeProfit] = useToggle(false)
  const [stopLoss, toggleStopLoss] = useToggle(false)

  return (
    <div className={styles.root}>
      <div className={styles.inputGroup}>
        <NumericalInput label="Unit" rightSide={props.tokens?.[0]?.symbol} />
        <TradePercentagePicker />
        <div>
          <NumericalInput
            label="Bought price"
            rightSide={props.tokens?.[1]?.symbol}
          />
          <Typography
            variant="body3"
            as="div"
            align="center"
            className={styles.currentPrice}
          >
            Current Price:{' '}
            <ButtonBase className={styles.currentPriceButton}>
              {bignumberUtils.format('54903')} {props.tokens?.[1]?.symbol}
            </ButtonBase>
          </Typography>
        </div>
        <NumericalInput label="Total" rightSide={props.tokens?.[1]?.symbol} />
      </div>
      <div className={styles.inputGroup}>
        <div className={styles.trailingBuyTitle}>
          <Typography as="div" className={styles.takeProfitLabel}>
            Take profit
          </Typography>
          <Switch
            size="small"
            checked={takeProfit}
            onChange={toggleTakeProfit}
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
          <Switch size="small" checked={stopLoss} onChange={toggleStopLoss} />
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
