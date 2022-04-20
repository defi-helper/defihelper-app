import { useStore } from 'effector-react'
import clsx from 'clsx'
import { useEffect } from 'react'
import isEmpty from 'lodash.isempty'

import { Chart, ChartGroups } from '~/common/chart'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import * as model from './portfolio-coin-balance.model'
import * as styles from './portfolio-coin-balance.css'

export type PortfolioCoinBalanceProps = {
  className?: string
}

const BALANCE = [
  {
    valueY: 'stableCoin',
    format: 'stableCoinFormat',
    name: 'Stablecoins',
    dateX: 'date',
    color: '#4463EE',
  },
  {
    valueY: 'altCoin',
    format: 'altCoinFormat',
    name: 'Volatile coins',
    dateX: 'date',
    color: '#E9CC67',
  },
]

export const PortfolioCoinBalance: React.VFC<PortfolioCoinBalanceProps> = (
  props
) => {
  const currentGroup = useStore(model.$currentGroup)
  const portfolioCoinBalance = useStore(model.$portfolioCoinBalance)
  const loading = useStore(model.fetchChartDataFx.pending)

  useEffect(() => {
    model.fetchChartDataFx(currentGroup)
  }, [currentGroup])

  useEffect(() => {
    return () => {
      model.reset()
    }
  }, [])

  const handleChangeMetric = (group: string) => {
    model.changeGroup(group)
  }

  return (
    <Paper radius={8} className={clsx(styles.root, props.className)}>
      <div className={styles.header}>
        <Typography>Overall Portfolio Balance</Typography>
        <ChartGroups onChange={handleChangeMetric} value={currentGroup}>
          {Object.values(portfolioCoinBalance)}
        </ChartGroups>
      </div>
      <Chart
        dataFields={BALANCE}
        id="coin_balance"
        loading={loading && isEmpty(portfolioCoinBalance[currentGroup].data)}
        data={portfolioCoinBalance[currentGroup].data}
        names={BALANCE.map(({ name }) => name)}
        // eslint-disable-next-line no-template-curly-in-string
        tooltipText="{name}: [bold]${format}[/]"
      />
    </Paper>
  )
}
