import clsx from 'clsx'
import { useMemo } from 'react'

import { bignumberUtils } from '~/common/bignumber-utils'
import { Typography } from '~/common/typography'
import * as styles from './trade-status-chart.css'

export type TradeStatusChartProps = {
  className?: string
  reverse?: boolean
  stopLoss?: string
  takeProfit?: string
  buy?: string
  profit?: string
  moving?: boolean
  percent: string
}

const getPercentCurry =
  (min = '0') =>
  (max = '100') =>
  (value = '0') => {
    const left = bignumberUtils.minus(value, min)
    const right = bignumberUtils.minus(max, min)

    const div = bignumberUtils.div(left, right)

    const mul = bignumberUtils.mul(div, 100)

    if (bignumberUtils.gt(mul, 100)) return '100'

    if (bignumberUtils.isNaN(mul) || bignumberUtils.lt(mul, 0)) return '0'

    return bignumberUtils.floor(mul)
  }

export const TradeStatusChart: React.VFC<TradeStatusChartProps> = (props) => {
  const buy = props.buy ?? props.profit

  const takeProfit =
    bignumberUtils.gt(props.takeProfit, 0) ||
    !bignumberUtils.gt(props.stopLoss, props.takeProfit)
      ? props.takeProfit
      : undefined
  const stopLoss = bignumberUtils.gt(props.stopLoss, 0)
    ? props.stopLoss
    : undefined

  const total =
    takeProfit ??
    (bignumberUtils.gt(props.profit, buy) ? props.profit : buy) ??
    buy ??
    props.profit
  const min =
    stopLoss ??
    (bignumberUtils.lt(props.profit, buy) ? props.profit : buy) ??
    buy ??
    props.profit

  const getPercent = useMemo(() => getPercentCurry(min)(total), [total, min])

  const profitPos = getPercent(props.profit)

  const buyPos = getPercent(buy)

  const maxWidth = bignumberUtils.gt(profitPos, buyPos)
    ? bignumberUtils.minus(profitPos, buyPos)
    : bignumberUtils.minus(buyPos, profitPos)

  return (
    <div className={clsx(styles.root, props.className)}>
      {bignumberUtils.gt(props.stopLoss, 0) && (
        <div className={styles.stopLossLine}>
          <Typography as="div" className={styles.stopLoss}>
            <Typography
              variant="inherit"
              className={styles.stopLossTitle}
              weight="bold"
            >
              {props.moving ? 'TSL' : 'SL'}
            </Typography>
            <Typography variant="inherit" className={styles.grey}>
              {bignumberUtils.toFixed(props.stopLoss, 4)}
            </Typography>
          </Typography>
        </div>
      )}
      <div className={styles.rail}>
        {props.profit && (
          <div
            className={clsx(styles.profitLine, {
              [styles.normalColor]: bignumberUtils.gt(profitPos, buyPos),
              [styles.reverseColor]: bignumberUtils.lt(profitPos, buyPos),
            })}
            style={{
              left: `${profitPos}%`,
            }}
          >
            <Typography
              as="div"
              className={styles.profit}
              style={
                bignumberUtils.lt(profitPos, 50) ? { left: 4 } : { right: 4 }
              }
            >
              {props.buy && (
                <Typography
                  variant="inherit"
                  className={clsx(styles.profitTitle, {
                    [styles.positive]: bignumberUtils.gt(props.percent, 0),
                    [styles.negative]: bignumberUtils.lt(props.percent, 0),
                  })}
                  weight="bold"
                >
                  {bignumberUtils.gt(profitPos, buyPos) && '+'}
                  {props.percent}%
                </Typography>
              )}
              <Typography variant="inherit">
                {bignumberUtils.toFixed(props.profit, 4)}
              </Typography>
            </Typography>
          </div>
        )}
        {props.profit && (
          <div
            className={clsx(styles.track, {
              [styles.normalColor]: bignumberUtils.gt(profitPos, buyPos),
              [styles.reverseColor]: bignumberUtils.lt(profitPos, buyPos),
            })}
            style={{
              left: `${
                bignumberUtils.lt(profitPos, buyPos) ? profitPos : buyPos
              }%`,
              maxWidth: `${maxWidth}%`,
            }}
          />
        )}
        {buy && (
          <div className={styles.buyLine} style={{ left: `${buyPos}%` }}>
            <Typography
              as="div"
              className={styles.buy}
              style={bignumberUtils.gt(buyPos, 50) ? { right: 4 } : { left: 4 }}
            >
              <Typography
                variant="inherit"
                className={styles.buyTitle}
                weight="bold"
              >
                Buy
              </Typography>
              <Typography variant="inherit">
                {bignumberUtils.toFixed(buy, 4)}
              </Typography>
            </Typography>
          </div>
        )}
      </div>
      {bignumberUtils.gt(props.takeProfit, 0) && (
        <div className={styles.takeProfitLine}>
          <Typography as="div" className={styles.takeProfit}>
            <Typography
              variant="inherit"
              className={styles.takeProfitTitle}
              weight="bold"
            >
              TP
            </Typography>
            <Typography variant="inherit" className={styles.grey}>
              {bignumberUtils.toFixed(props.takeProfit, 4)}
            </Typography>
          </Typography>
        </div>
      )}
    </div>
  )
}
