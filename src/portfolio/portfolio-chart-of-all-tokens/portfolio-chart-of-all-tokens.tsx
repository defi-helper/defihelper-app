import { useGate, useStore } from 'effector-react'
import clsx from 'clsx'
import { useState } from 'react'

import { Chart } from '~/common/chart'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { PortfolioChartGroups } from '~/portfolio/common'
import * as model from './portfolio-chart-of-all-tokens.model'
import * as styles from './portfolio-chart-of-all-tokens.css'
import { MetricGroupEnum } from '~/graphql/_generated-types'

export type PortfolioChartOfAllTokensProps = {
  stable?: boolean
  className?: string
  variant: 'total' | 'estimated' | 'balance'
}

const TOTAL_NET_WORTH = [
  {
    valueY: 'allTokens',
    name: 'Total Net Worth',
    dateX: 'date',
    color: '#39C077',
  },
  {
    valueY: 'stable',
    name: 'On Wallets',
    dateX: 'date',
    color: '#4463EE',
  },
  {
    valueY: 'shit',
    name: 'Yield Farming',
    dateX: 'date',
    color: '#E9CC67',
  },
]

const ESTIMATED = [
  {
    valueY: 'allTokens',
    name: 'Estimated Value',
    dateX: 'date',
    color: '#F08BA9',
  },
  {
    valueY: 'stable',
    name: 'Value with Autostacking Automation',
    dateX: 'date',
    color: '#CCFF3C',
  },
]

const BALANCE = [
  {
    valueY: 'allTokens',
    name: 'Stablecoins',
    dateX: 'date',
    color: '#F08BA9',
  },
  {
    valueY: 'stable',
    name: 'Altcoinss',
    dateX: 'date',
    color: '#CCFF3C',
  },
]

const TOKENS = ['allTokens', 'stable', 'shit']

const variants = {
  total: TOTAL_NET_WORTH,
  estimated: ESTIMATED,
  balance: BALANCE,
}

export const PortfolioChartOfAllTokens: React.FC<PortfolioChartOfAllTokensProps> =
  (props) => {
    const [currentGroup, setCurrentGroup] = useState<
      Exclude<MetricGroupEnum, MetricGroupEnum.Hour>
    >(MetricGroupEnum.Day)
    const portfolioChartOfAllTokens = useStore(model.$portfolioChartOfAllTokens)

    useGate(model.PortfolioChartOfAllTokensGate, {
      tokens: TOKENS,
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
          <Typography>{props.children}</Typography>
          <PortfolioChartGroups
            onChange={handleChangeMetric}
            value={currentGroup}
          >
            {Object.values(portfolioChartOfAllTokens)}
          </PortfolioChartGroups>
        </div>
        <Chart
          dataFields={variants[props.variant]}
          id="tokens"
          data={portfolioChartOfAllTokens[currentGroup].data}
          names={['All tokens', 'Stable', 'Shit']}
          // eslint-disable-next-line no-template-curly-in-string
          tooltipText="{name}: [bold]${valueY}[/]"
        />
      </Paper>
    )
  }
