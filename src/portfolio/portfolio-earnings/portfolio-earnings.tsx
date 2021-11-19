import { useStore } from 'effector-react'
import clsx from 'clsx'
import { useEffect } from 'react'

import { Chart } from '~/common/chart'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import * as portfolioMetricCardModel from '~/portfolio/portfolio-metric-cards/portfolio-metric-cards.model'
import { MetricGroupEnum } from '~/graphql/_generated-types'
import * as model from './portfolio-earnings.model'
import * as styles from './portfolio-earnings.css'

export type PortfolioEarningsProps = {
  className?: string
}

const ESTIMATED_FIELDS = [
  {
    valueY: 'hold',
    name: 'Estimated Value',
    dateX: 'date',
    color: '#F08BA9',
  },
  {
    valueY: 'autostaking',
    name: 'Value with Autostacking Automation',
    dateX: 'date',
    color: '#CCFF3C',
  },
]

const currentGroup = MetricGroupEnum.Day

export const PortfolioEarnings: React.VFC<PortfolioEarningsProps> = (props) => {
  const portfolioEarnings = useStore(model.$portfolioEarnings)
  const metric = useStore(portfolioMetricCardModel.$metric)

  useEffect(() => {
    if (!metric?.stakedUSD) return

    model.fetchChartDataFx({
      group: currentGroup,
      balance: Number(metric?.stakedUSD ?? 0),
      apy: Number(metric.apy ?? 0),
    })
  }, [metric])

  return (
    <Paper radius={8} className={clsx(styles.root, props.className)}>
      <div className={styles.header}>
        <Typography>Estimated Earnings</Typography>
      </div>
      <Chart
        dataFields={ESTIMATED_FIELDS}
        id="earnings"
        data={portfolioEarnings[currentGroup].data}
        names={ESTIMATED_FIELDS.map(({ name }) => name)}
        // eslint-disable-next-line no-template-curly-in-string
        tooltipText="{name}: [bold]${valueY}[/]"
      />
    </Paper>
  )
}
