import clsx from 'clsx'

import chartExample from '~/assets/images/chart-example.png'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import * as styles from './protocol-demand-metrics.css'

export type ProtocolDemandMetricsProps = {
  className?: string
}

const DEMAND_METRICS = [
  ['Pool', 'Users', '24h %', '7d%', 'Last Month'],
  [
    'Site',
    '12,372',
    '-12%',
    '-12%',
    <img className={styles.chart} src={chartExample} alt="" />,
  ],
  [
    'Medium',
    '12,372',
    '-12%',
    '-12%',
    <img className={styles.chart} src={chartExample} alt="" />,
  ],
  [
    'Twitter',
    '12,372',
    '-12%',
    '-12%',
    <img className={styles.chart} src={chartExample} alt="" />,
  ],
]

export const ProtocolDemandMetrics: React.FC<ProtocolDemandMetricsProps> = (
  props
) => {
  return (
    <div className={clsx(styles.root, props.className)}>
      <Typography variant="h3" className={styles.title}>
        Statistics
      </Typography>
      <Paper radius={8} className={styles.tableInner}>
        {DEMAND_METRICS.map((row, rowIndex) => (
          <div
            key={String(rowIndex)}
            className={clsx(styles.row, !rowIndex && styles.grey)}
          >
            {row.map((cell, cellIndex) => (
              <Typography
                key={String(cellIndex)}
                variant="body2"
                family={!rowIndex || !cellIndex ? 'square' : 'mono'}
                className={clsx(
                  typeof cell === 'string' && cell.includes('-') && styles.red
                )}
              >
                {cell}
              </Typography>
            ))}
          </div>
        ))}
      </Paper>
    </div>
  )
}
