import Typography from '@material-ui/core/Typography'

import { MainLayout } from '~/layouts'
import { DashboardSummaryOfTokens } from '~/dashboard/dashboard-summary-of-tokens'
import { DashboardChartOfAllTokens } from '~/dashboard/dashboard-chart-of-all-tokens'
import { DashboardBlockchains } from '~/dashboard/dashboard-blockchains'

export type DashboardProps = unknown

export const Dashboard: React.VFC<DashboardProps> = () => {
  return (
    <MainLayout>
      <DashboardSummaryOfTokens />
      <Typography>all tokens</Typography>
      <DashboardChartOfAllTokens id="all_tokens" />
      <Typography>stable</Typography>
      <DashboardChartOfAllTokens stable id="stable_tokens" />
      <Typography>shit</Typography>
      <DashboardChartOfAllTokens stable={false} id="shit_tokens" />
      <DashboardBlockchains />
    </MainLayout>
  )
}
