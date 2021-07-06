import { Typography } from '@material-ui/core'
import { useGate, useStore } from 'effector-react'

import * as model from './dashboard-summary-of-tokens.model'

export type DashboardSummaryOfTokensProps = unknown

export const DashboardSummaryOfTokens: React.VFC<DashboardSummaryOfTokensProps> =
  () => {
    const dashboard = useStore(model.$dashboardSummaryOfTokens)

    useGate(model.dashboardSummaryOfTokensGate)

    const fetchSummaryOfTokensForLastHourFxLoading = useStore(
      model.fetchSummaryOfTokensForLastHourFx.pending
    )
    const fetchSummaryOfTokensForLastHourFxYesterdayLoading = useStore(
      model.fetchSummaryOfTokensForLastHourForYesterdayFx.pending
    )

    return (
      <div>
        <Typography>
          Summary of all tokens for last hour(usd):{' '}
          {fetchSummaryOfTokensForLastHourFxLoading
            ? 'loading...'
            : dashboard.summaryOfTokensForLastHour.toLocaleString('en-EU')}{' '}
          (
          {fetchSummaryOfTokensForLastHourFxYesterdayLoading
            ? 'loading...'
            : dashboard.summaryDiffOfYesterdayPercent}
          %)
        </Typography>
      </div>
    )
  }
