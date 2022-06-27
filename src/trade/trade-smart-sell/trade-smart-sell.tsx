import { useToggle } from 'react-use'

import { bignumberUtils } from '~/common/bignumber-utils'
import { ButtonBase } from '~/common/button-base'
import { NumericalInput } from '~/common/numerical-input'
import { Typography } from '~/common/typography'
import { Icon } from '~/common/icon'
import { Switch } from '~/common/switch'
import { TradeInput } from '~/trade/common/trade-input'
import { TradePlusMinus } from '~/trade/common/trade-plus-minus'
import { TradeSlider } from '~/trade/common/trade-slider'
import { TradePercentagePicker } from '~/trade/common/trade-percentage-picker'
import * as styles from './trade-smart-sell.css'

export type TradeSmartSellProps = {
  className?: string
}

export const TradeSmartSell: React.VFC<TradeSmartSellProps> = () => {
  const [takeProfit, toggleTakeProfit] = useToggle(false)
  const [stopLoss, toggleStopLoss] = useToggle(false)

  return (
    <div className={styles.root}>
      <div className={styles.inputGroup}>
        <NumericalInput label="Unit" rightSide="BTC" />
        <TradePercentagePicker />
        <div>
          <NumericalInput label="Bought price" rightSide="USDT" />
          <Typography
            variant="body3"
            as="div"
            align="center"
            className={styles.currentPrice}
          >
            Current Price:{' '}
            <ButtonBase className={styles.currentPriceButton}>
              {bignumberUtils.format('54903')} USDT
            </ButtonBase>
          </Typography>
        </div>
        <NumericalInput label="Total" rightSide="USDT" />
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
            <NumericalInput rightSide={<>USDT</>} />
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
          <Switch size="small" checked={stopLoss} onChange={toggleStopLoss} />
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
