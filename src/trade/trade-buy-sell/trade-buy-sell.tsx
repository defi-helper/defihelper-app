import { useToggle } from 'react-use'

import { Icon } from '~/common/icon'
import { NumericalInput } from '~/common/numerical-input'
import { Switch } from '~/common/switch'
import { Typography } from '~/common/typography'
import { TradeInput } from '~/trade/common/trade-input'
import { TradePlusMinus } from '~/trade/common/trade-plus-minus'
import { TradeSlider } from '~/trade/common/trade-slider'
import { TradePercentagePicker } from '~/trade/common/trade-percentage-picker'
import * as styles from './trade-buy-sell.css'

export type TradeBuySellProps = {
  className?: string
}

export const TradeBuySell: React.VFC<TradeBuySellProps> = () => {
  const [takeProfit, toggleTakeProfit] = useToggle(false)
  const [stopLoss, toggleStopLoss] = useToggle(false)

  return (
    <div className={styles.root}>
      <div className={styles.inputGroup}>
        <NumericalInput label="Amount" rightSide={<>BTC</>} />
        <NumericalInput label="Market price" rightSide={<>USDT</>} />
        <div className={styles.trailingBuy}>
          <div className={styles.trailingBuyTitle}>
            <Typography
              variant="body3"
              as="label"
              transform="uppercase"
              family="mono"
              className={styles.trailingBuyLabel}
            >
              Trailing buy
              <Icon icon="info" width="1em" height="1em" />
            </Typography>
            <Switch size="small" />
          </div>
          <TradeInput
            className={styles.trailingBuyInput}
            negativeOrPositive
            rightSide={<>%</>}
          />
          <TradePlusMinus />
        </div>
        <NumericalInput label="Total" rightSide="USDT" />
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
            <NumericalInput rightSide="USDT" />
            <div className={styles.trailingBuy}>
              <TradeInput
                className={styles.trailingBuyInput}
                negativeOrPositive
                rightSide={<>%</>}
              />
              <TradeSlider className={styles.slider} />
            </div>
            <div className={styles.trailingBuyTitle}>
              <Typography
                variant="body3"
                as="label"
                transform="uppercase"
                family="mono"
                className={styles.trailingBuyLabel}
              >
                Trailing take profit
                <Icon icon="info" width="1em" height="1em" />
              </Typography>
              <Switch size="small" />
            </div>
            <div className={styles.trailingBuy}>
              <Typography
                variant="body3"
                as="label"
                className={styles.trailingBuyLabel}
              >
                Follow max price with deviation [%]
                <Icon icon="info" width="1em" height="1em" />
              </Typography>
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
      <div className={styles.inputGroup}>
        <div className={styles.trailingBuyTitle}>
          <Typography as="div" className={styles.takeProfitLabel}>
            Stop Loss
          </Typography>
          <Switch size="small" onChange={toggleStopLoss} checked={stopLoss} />
        </div>
        {stopLoss && (
          <>
            <NumericalInput rightSide={<>USDT</>} />
            <div className={styles.trailingBuy}>
              <TradeInput
                className={styles.trailingBuyInput}
                negativeOrPositive
                rightSide={<>%</>}
              />
              <TradeSlider className={styles.slider} reverse />
            </div>
            <div className={styles.trailingBuy}>
              <div className={styles.trailingBuyTitle}>
                <Typography
                  variant="body3"
                  as="label"
                  transform="uppercase"
                  family="mono"
                  className={styles.trailingBuyLabel}
                >
                  Trailing Stop Loss
                  <Icon icon="info" width="1em" height="1em" />
                </Typography>
                <Switch size="small" />
              </div>
              <TradeInput
                className={styles.trailingBuyInput}
                negativeOrPositive
                rightSide={<>%</>}
              />
              <TradeSlider className={styles.slider} reverse />
            </div>
            <div className={styles.trailingBuy}>
              <div className={styles.trailingBuyTitle}>
                <Typography
                  variant="body3"
                  as="label"
                  transform="uppercase"
                  family="mono"
                  className={styles.trailingBuyLabel}
                >
                  Stop Loss timeout
                  <Icon icon="info" width="1em" height="1em" />
                </Typography>
                <Switch size="small" />
              </div>
              <TradeInput
                className={styles.trailingBuyInput}
                negativeOrPositive
                rightSide="Sec"
              />
              <TradePlusMinus />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
