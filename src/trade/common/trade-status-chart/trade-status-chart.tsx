/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx'
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

export const TradeStatusChart: React.VFC<TradeStatusChartProps> = (props) => {
  const width = '100'

  const total = props.takeProfit ?? props.buy

  const left = '-20'

  const right = '10'

  const buyPos = props.stopLoss ? '10' : '0'

  const leftGreaterThanZero = bignumberUtils.gte(left, 0)

  const maxWidth = bignumberUtils.minus(width, left)

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
          className={styles.profitLine}
          style={{
            left: !leftGreaterThanZero ? `calc(${left}% - 1px)` : undefined,
            right: leftGreaterThanZero ? `calc(${left}% - 1px)` : undefined,
          }}
        >
          <Typography as="div" className={styles.profit} style={{ right: 4 }}>
            <Typography
              variant="inherit"
              className={styles.profitTitle}
              weight="bold"
            >
              + 10%
            </Typography>
            <Typography variant="inherit">
              {bignumberUtils.format(props.profit)}
            </Typography>
          </Typography>
        </div>
        <div
          className={clsx(styles.track, {
            [styles.trackNormal]: !props.reverse,
            [styles.trackReverse]: props.reverse,
          })}
          style={{
            left: !leftGreaterThanZero ? `${left}%` : undefined,
            right: leftGreaterThanZero ? `${left}%` : undefined,
            maxWidth: `${maxWidth}%`,
          }}
        />
        <div className={styles.buyLine} style={{ left: `${buyPos}%` }}>
          <Typography as="div" className={styles.buy} style={{ left: 4 }}>
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
