import { useStore } from 'effector-react'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { Chart } from '~/common/chart'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { PortfolioChartGroups } from '~/portfolio/common'
import * as model from './portfolio-earnings.model'
import * as styles from './portfolio-earnings.css'
import { MetricGroupEnum } from '~/graphql/_generated-types'

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

const SUM = 10000
const APY = 90 / 100

export const PortfolioEarnings: React.VFC<PortfolioEarningsProps> = (props) => {
  const [currentGroup, setCurrentGroup] = useState<
    Exclude<MetricGroupEnum, MetricGroupEnum.Hour>
  >(MetricGroupEnum.Day)
  const portfolioEarnings = useStore(model.$portfolioEarnings)

  useEffect(() => {
    model.fetchChartDataFx({
      group: currentGroup,
      balance: SUM,
      apy: APY,
    })
  }, [currentGroup])

  const handleChangeMetric = (
    group: Exclude<MetricGroupEnum, MetricGroupEnum.Hour>
  ) => {
    setCurrentGroup(group)
  }

  return (
    <Paper radius={8} className={clsx(styles.root, props.className)}>
      <div className={styles.header}>
        <Typography>Estimated Earnings</Typography>
        <PortfolioChartGroups
          onChange={handleChangeMetric}
          value={currentGroup}
        >
          {Object.values(portfolioEarnings)}
        </PortfolioChartGroups>
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
