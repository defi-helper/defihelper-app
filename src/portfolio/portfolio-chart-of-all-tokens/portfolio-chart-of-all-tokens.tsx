import { useGate, useStore } from 'effector-react'
import { Chart } from '~/common/chart'

import * as model from './portfolio-chart-of-all-tokens.model'

export type PortfolioChartOfAllTokensProps = {
  stable?: boolean
  id: string
}

export const PortfolioChartOfAllTokens: React.VFC<PortfolioChartOfAllTokensProps> =
  (props) => {
    const portfolioChartOfAllTokens = useStore(model.$portfolioChartOfAllTokens)

    useGate(model.PortfolioChartOfAllTokensGate, props)

    return (
      <Chart
        dataFields={{
          valueY: 'sum',
          dateX: 'date',
        }}
        id={props.id}
        data={portfolioChartOfAllTokens[props.id]}
        tooltipText="{sum}"
      />
    )
  }
