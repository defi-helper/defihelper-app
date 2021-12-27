import { useStore } from 'effector-react'
import clsx from 'clsx'
import { useEffect } from 'react'

import { Chart } from '~/common/chart'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { PortfolioChartGroups } from '~/portfolio/common'
import * as model from './portfolio-coin-balance.model'
import * as styles from './portfolio-coin-balance.css'
import { MetricGroupEnum } from '~/graphql/_generated-types'

export type PortfolioCoinBalanceProps = {
  className?: string
}

const BALANCE = [
  {
    valueY: 'stableCoin',
    name: 'Liquid coins',
    dateX: 'date',
    color: '#4463EE',
  },
  {
    valueY: 'altCoin',
    name: 'Low volume coins',
    dateX: 'date',
    color: '#E9CC67',
  },
]

export const PortfolioCoinBalance: React.VFC<PortfolioCoinBalanceProps> = (
  props
) => {
  const currentGroup = useStore(model.$currentGroup)
  const portfolioCoinBalance = useStore(model.$portfolioCoinBalance)

  useEffect(() => {
    model.fetchChartDataFx(currentGroup)
  }, [currentGroup])

  const handleChangeMetric = (
    group: Exclude<MetricGroupEnum, MetricGroupEnum.Hour>
  ) => {
    model.changeGroup(group)
  }

  return (
    <Paper radius={8} className={clsx(styles.root, props.className)}>
      <div className={styles.header}>
        <Typography>Overall Portfolio Balance</Typography>
        <PortfolioChartGroups
          onChange={handleChangeMetric}
          value={currentGroup}
        >
          {Object.values(portfolioCoinBalance)}
        </PortfolioChartGroups>
      </div>
      <Chart
        dataFields={BALANCE}
        id="coin_balance"
        data={portfolioCoinBalance[currentGroup].data}
        names={BALANCE.map(({ name }) => name)}
        // eslint-disable-next-line no-template-curly-in-string
        tooltipText="{name}: [bold]${valueY}[/]"
      />
    </Paper>
  )
}
