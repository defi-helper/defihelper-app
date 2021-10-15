import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import * as styles from './portfolio-metric-card.css'

export type PortfolioMetricCardProps = {
  title: React.ReactNode
  value: React.ReactNode
  growthValue: React.ReactNode
  positive: boolean
}

export const PortfolioMetricCard: React.VFC<PortfolioMetricCardProps> = (
  props
) => {
  return (
    <Paper radius={8} className={styles.root}>
      <Typography variant="body2" className={styles.title}>
        {props.title}
      </Typography>
      <Typography variant="h3" family="mono">
        {props.value}
      </Typography>
      <Typography variant="body2">
        <Typography
          variant="inherit"
          className={
            props.positive ? styles.variant.positive : styles.variant.negative
          }
        >
          {props.growthValue}
        </Typography>{' '}
        <Typography variant="inherit" className={styles.time}>
          today
        </Typography>
      </Typography>
    </Paper>
  )
}
