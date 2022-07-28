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
    2,
    false
  )

  const rawContibutedPercent = bignumberUtils.floor(
    bignumberUtils.mul(bignumberUtils.minus(props.valueChanged, 1), 100)
  )

  const isZero = bignumberUtils.isZero(bignumberUtils.floor(props.valueChanged))
  const isPositive = bignumberUtils.gte(rawContibutedPercent, 0) || isZero

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
            styles[isPositive || isZero ? 'positive' : 'negative']
          )}
        >
          {isZero ? (
            '-'
          ) : (
            <>
              {isPositive && '+'}
              {calculated}% <span className={styles.today}>today</span>
            </>
          )}
        </Typography>
      )}
    </Paper>
  )
}
