import { useStore } from 'effector-react'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { Chart } from '~/common/chart'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { PortfolioChartGroups } from '~/portfolio/common'
import * as model from './portfolio-total-worth.model'
import * as styles from './portfolio-total-worth.css'
import { MetricGroupEnum } from '~/graphql/_generated-types'

export type PortfolioTotalWorthProps = {
  className?: string
}

const TOTAL_NET_WORTH = [
  {
    valueY: 'totalNetWorth',
    name: 'Total Net Worth',
    dateX: 'date',
    color: '#39C077',
  },
  {
    valueY: 'onWallets',
    name: 'On Wallets',
    dateX: 'date',
    color: '#4463EE',
  },
  {
    valueY: 'farming',
    name: 'Yield Farming',
    dateX: 'date',
    color: '#E9CC67',
  },
]

export const PortfolioTotalWorth: React.VFC<PortfolioTotalWorthProps> = (
  props
) => {
  const [currentGroup, setCurrentGroup] = useState<
    Exclude<MetricGroupEnum, MetricGroupEnum.Hour>
  >(MetricGroupEnum.Day)
  const portfolioTotalWorth = useStore(model.$portfolioTotalWorth)

  useEffect(() => {
    model.fetchChartDataFx({
      group: currentGroup,
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
        <Typography>Total Net Worth Dynamics</Typography>
        <PortfolioChartGroups
          onChange={handleChangeMetric}
          value={currentGroup}
        >
          {Object.values(portfolioTotalWorth)}
        </PortfolioChartGroups>
      </div>
      <Chart
        dataFields={TOTAL_NET_WORTH}
        id="total_worth"
        data={portfolioTotalWorth[currentGroup].data}
        names={TOTAL_NET_WORTH.map(({ name }) => name)}
        // eslint-disable-next-line no-template-curly-in-string
        tooltipText="{name}: [bold]${valueY}[/]"
      />
    </Paper>
  )
}
