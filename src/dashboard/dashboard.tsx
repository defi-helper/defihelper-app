import Typography from '@material-ui/core/Typography'
import { Button } from '@material-ui/core'

import { AppLayout } from '~/layouts'
import { DashboardSummaryOfTokens } from '~/dashboard/dashboard-summary-of-tokens'
import { DashboardChartOfAllTokens } from '~/dashboard/dashboard-chart-of-all-tokens'
import { DashboardBlockchains } from '~/dashboard/dashboard-blockchains'
import { useDialog } from '~/common/dialog'
import { DashboardAddWalletDialog } from './common/dashboard-add-wallet-dialog'
import * as model from './dashboard.model'
import { Can } from '~/users'

export type DashboardProps = unknown

export const Dashboard: React.VFC<DashboardProps> = () => {
  const [openAddWalletDialog] = useDialog(DashboardAddWalletDialog)

  const handleOpenAddWalletDialog = async () => {
    try {
      const res = await openAddWalletDialog()

      model.addWalletFx(res)
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <AppLayout>
      <DashboardSummaryOfTokens />
      <Typography>all tokens</Typography>
      <DashboardChartOfAllTokens id="all_tokens" />
      <Typography>stable</Typography>
      <DashboardChartOfAllTokens stable id="stable_tokens" />
      <Typography>shit</Typography>
      <DashboardChartOfAllTokens stable={false} id="shit_tokens" />
      <DashboardBlockchains />
      <Can I="create" a="Wallet">
        <Button onClick={handleOpenAddWalletDialog}>add wallet</Button>
      </Can>
    </AppLayout>
  )
}
