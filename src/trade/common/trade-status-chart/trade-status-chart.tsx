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
  const left = '30'
  const width = '100'

  return (
    <div className={clsx(styles.root, props.className)}>
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
      <div className={styles.rail}>
        <div
          className={styles.profitLine}
          style={{ left: `calc(${width}% - 1px)` }}
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
            left: `${left}%`,
            maxWidth: `calc(${width}% - ${left}%)`,
          }}
        />
        <div className={styles.buyLine} style={{ left: `${left}%` }}>
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
    </div>
  )
}
