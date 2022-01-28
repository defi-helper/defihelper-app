import { useStore } from 'effector-react'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { Chart, ChartGroups, CHART_GROUP_VALUES } from '~/common/chart'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import * as model from './portfolio-total-worth.model'
import * as styles from './portfolio-total-worth.css'

export type PortfolioTotalWorthProps = {
  className?: string
}

const TOTAL_NET_WORTH = [
  {
    valueY: 'stakingUSD',
    format: 'stakingUSDFormat',
    name: 'Staked balance',
    dateX: 'date',
    color: '#39C077',
  },
  {
    valueY: 'balance',
    format: 'balanceFormat',
    name: 'Balance',
    dateX: 'date',
    color: '#e39090',
  },

  {
    valueY: 'earned',
    format: 'earnedFormat',
    name: 'Earned',
    dateX: 'date',
    color: '#51b0cb',
  },
]

export const PortfolioTotalWorth: React.VFC<PortfolioTotalWorthProps> = (
  props
) => {
  const [currentGroup, setCurrentGroup] = useState<string>(
    CHART_GROUP_VALUES.month
  )
  const portfolioTotalWorth = useStore(model.$portfolioTotalWorth)

  useEffect(() => {
    model.fetchChartDataFx({
      group: currentGroup,
    })
  }, [currentGroup])

  const handleChangeMetric = (group: string) => {
    setCurrentGroup(group)
  }

  return (
    <Paper radius={8} className={clsx(styles.root, props.className)}>
      <div className={styles.header}>
        <Typography>Tracked Balance Dynamics</Typography>
        <ChartGroups onChange={handleChangeMetric} value={currentGroup}>
          {Object.values(portfolioTotalWorth)}
        </ChartGroups>
      </div>
      <Chart
        dataFields={TOTAL_NET_WORTH}
        id="total_worth"
        data={portfolioTotalWorth[currentGroup].data}
        names={TOTAL_NET_WORTH.map(({ name }) => name)}
        // eslint-disable-next-line no-template-curly-in-string
        tooltipText="{name}: [bold]${format}[/]"
      />
    </Paper>
  )
}
