import clsx from 'clsx'
import * as styles from './trade-status-chart.css'

export type TradeStatusChartProps = {
  className?: string
}

export const TradeStatusChart: React.VFC<TradeStatusChartProps> = (props) => {
  return (
    <div className={clsx(styles.root, props.className)}>
      <div className={styles.rail} />
    </div>
  )
}
