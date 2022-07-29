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

const ValueChangeRender: React.FC<{ value?: string }> = ({ value }) => {
  const contibutedPercent = bignumberUtils.toFixed(
    bignumberUtils.mul(bignumberUtils.minus(value, 1), 100),
    2
  )

  const isPositive = bignumberUtils.gte(contibutedPercent, 0)

  if (
    contibutedPercent.replace(/\D/g, '') === '0' ||
    value?.replace(/\D/g, '') === '0'
  ) {
    return (
      <Typography variant="body1" className={clsx(styles.changes)}>
        -
      </Typography>
    )
  }

  return (
    <Typography
      variant="body1"
      className={clsx(
        styles.changes,
        styles[isPositive ? 'positive' : 'negative']
      )}
    >
      {isPositive && '+'}
      {contibutedPercent}% <span className={styles.today}>today</span>
    </Typography>
  )
}

export const PortfolioMetricCard: React.VFC<PortfolioMetricCardProps> = (
  props
) => {
  return (
    <Paper radius={8} className={clsx(styles.root, props.className)}>
      <Typography variant="body2" className={styles.title}>
        {props.title}
      </Typography>
      <Typography variant="h3" family="mono">
        {props.value}
      </Typography>

      {props.valueChanged && <ValueChangeRender value={props.valueChanged} />}
    </Paper>
  )
}
