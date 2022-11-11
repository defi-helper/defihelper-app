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
  const total = props.takeProfit ?? props.buy
  const min = props.stopLoss ?? props.buy

  const getPercent = useMemo(() => getPercentCurry(min)(total), [total, min])

  const profitPos = getPercent(props.profit)

  const buyPos = getPercent(props.buy)

  const maxWidth = bignumberUtils.gt(profitPos, buyPos)
    ? bignumberUtils.minus(profitPos, buyPos)
    : bignumberUtils.minus(buyPos, profitPos)

  return (
    <div className={clsx(styles.root, props.className)}>
      {props.stopLoss && (
        <div className={styles.stopLossLine}>
          <Typography as="div" className={styles.stopLoss}>
            <Typography
              variant="inherit"
              className={styles.stopLossTitle}
              weight="bold"
            >
              SL
            </Typography>
            <Typography variant="inherit" className={styles.grey}>
              {bignumberUtils.format(props.stopLoss)}
            </Typography>
          </Typography>
        </div>
      )}
      <div className={styles.rail}>
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
            <Typography
              variant="inherit"
              className={styles.profitTitle}
              weight="bold"
            >
              {bignumberUtils.gt(profitPos, buyPos) ? '+' : '-'} {maxWidth}%
            </Typography>
            <Typography variant="inherit">
              {bignumberUtils.format(props.profit)}
            </Typography>
          </Typography>
        </div>
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
              {bignumberUtils.format(props.buy)}
            </Typography>
          </Typography>
        </div>
      </div>
      {props.takeProfit && (
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
              {bignumberUtils.format(props.takeProfit)}
            </Typography>
          </Typography>
        </div>
      )}
    </div>
  )
}
