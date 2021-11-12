import { useGate, useStore } from 'effector-react'
import clsx from 'clsx'
import { useState } from 'react'

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
    name: 'Stablecoins',
    dateX: 'date',
    color: '#F08BA9',
  },
  {
    valueY: 'allTokens',
    name: 'altCoin',
    dateX: 'date',
    color: '#CCFF3C',
  },
]

export const PortfolioCoinBalance: React.VFC<PortfolioCoinBalanceProps> = (
  props
) => {
  const [currentGroup, setCurrentGroup] = useState<
    Exclude<MetricGroupEnum, MetricGroupEnum.Hour>
  >(MetricGroupEnum.Day)
  const portfolioCoinBalance = useStore(model.$portfolioCoinBalance)

  useGate(model.PortfolioCoinBalanceGate, {
    group: currentGroup,
  })

  const handleChangeMetric = (
    group: Exclude<MetricGroupEnum, MetricGroupEnum.Hour>
  ) => {
    setCurrentGroup(group)
  }

  return (
    <Paper radius={8} className={clsx(styles.root, props.className)}>
      <div className={styles.header}>
        <Typography>Coin Balance</Typography>
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
        names={['Stable', 'Altcoins']}
        // eslint-disable-next-line no-template-curly-in-string
        tooltipText="{name}: [bold]${valueY}[/]"
      />
    </Paper>
  )
}
