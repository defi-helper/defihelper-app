import Typography from '@material-ui/core/Typography'
import { Button } from '@material-ui/core'

import { AppLayout } from '~/layouts'
import { PortfolioSummaryOfTokens } from '~/portfolio/portfolio-summary-of-tokens'
import { PortfolioChartOfAllTokens } from '~/portfolio/portfolio-chart-of-all-tokens'
import { PortfolioBlockchains } from '~/portfolio/portfolio-blockchains'
import { useDialog } from '~/common/dialog'
import { PortfolioAddWalletDialog } from './common'
import * as model from './portfolio.model'
import { Can } from '~/users'

export type PortfolioProps = unknown

export const Portfolio: React.VFC<PortfolioProps> = () => {
  const [openAddWalletDialog] = useDialog(PortfolioAddWalletDialog)

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
      <PortfolioSummaryOfTokens />
      <Typography>all tokens</Typography>
      <PortfolioChartOfAllTokens id="all_tokens" />
      <Typography>stable</Typography>
      <PortfolioChartOfAllTokens stable id="stable_tokens" />
      <Typography>shit</Typography>
      <PortfolioChartOfAllTokens stable={false} id="shit_tokens" />
      <PortfolioBlockchains />
      <Can I="create" a="Wallet">
        <Button onClick={handleOpenAddWalletDialog}>add wallet</Button>
      </Can>
    </AppLayout>
  )
}
