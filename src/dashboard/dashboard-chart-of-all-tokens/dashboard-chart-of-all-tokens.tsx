import { useGate, useStore } from 'effector-react'
import { Chart } from '~/common/chart'

import * as model from './dashboard-chart-of-all-tokens.model'

export type DashboardChartOfAllTokensProps = {
  stable?: boolean
  id: string
}

export const DashboardChartOfAllTokens: React.VFC<DashboardChartOfAllTokensProps> =
  (props) => {
    const dashboardChartOfAllTokens = useStore(model.$dashboardChartOfAllTokens)

    useGate(model.dashboardChartOfAllTokensGate, props)

    return (
      <Chart
        dataFields={{
          valueY: 'sum',
          dateX: 'date',
        }}
        id={props.id}
        data={dashboardChartOfAllTokens[props.id]}
        tooltipText="{sum}"
      />
    )
  }
