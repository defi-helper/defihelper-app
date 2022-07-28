import clsx from 'clsx'
import { bignumberUtils } from '~/common/bignumber-utils'

import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import * as styles from './portfolio-metric-card.css'

export type PortfolioMetricCardProps = {
  title: React.ReactNode
  value: React.ReactNode
  valueChanged?: string
  className?: string
}

export const PortfolioMetricCard: React.VFC<PortfolioMetricCardProps> = (
  props
) => {
  const calculated = bignumberUtils.format(
    bignumberUtils.mul(bignumberUtils.minus(props.valueChanged, 1), 100),
    2
  )

  const rawContibutedPercent = bignumberUtils.floor(
    bignumberUtils.mul(bignumberUtils.minus(props.valueChanged, 1), 100)
  )
  const isPositive =
    bignumberUtils.gte(rawContibutedPercent, 0) ||
    bignumberUtils.isZero(rawContibutedPercent)

  return (
    <Paper radius={8} className={clsx(styles.root, props.className)}>
      <Typography variant="body2" className={styles.title}>
        {props.title}
      </Typography>
      <Typography variant="h3" family="mono">
        {props.value}
      </Typography>

      {props.valueChanged && (
        <Typography
          variant="body1"
          className={clsx(
            styles.changes,
            styles[isPositive ? 'positive' : 'negative']
          )}
        >
          {isPositive ? '+' : '-'}
          {calculated}% <span className={styles.today}>today</span>
        </Typography>
      )}
    </Paper>
  )
}
