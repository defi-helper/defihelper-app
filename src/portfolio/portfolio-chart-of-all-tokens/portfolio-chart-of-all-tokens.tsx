import { useGate, useStore } from 'effector-react'

import { Chart } from '~/common/chart'
import * as model from './portfolio-chart-of-all-tokens.model'

export type PortfolioChartOfAllTokensProps = {
  stable?: boolean
}

const TOKENS = ['allTokens', 'stable', 'shit']

export const PortfolioChartOfAllTokens: React.VFC<PortfolioChartOfAllTokensProps> =
  () => {
    const portfolioChartOfAllTokens = useStore(model.$portfolioChartOfAllTokens)

    useGate(model.PortfolioChartOfAllTokensGate, TOKENS)

    return (
      <Chart
        dataFields={{
          valueY: 'sum',
          dateX: 'date',
        }}
        id="tokens"
        data={portfolioChartOfAllTokens}
        tooltipText="{sum}"
      />
    )
  }
