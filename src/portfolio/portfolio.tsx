import { Button } from '@material-ui/core'

import { AppLayout } from '~/layouts'
import { PortfolioSummaryOfTokens } from '~/portfolio/portfolio-summary-of-tokens'
import { PortfolioChartOfAllTokens } from '~/portfolio/portfolio-chart-of-all-tokens'
import { PortfolioBlockchains } from '~/portfolio/portfolio-blockchains'
import { useDialog } from '~/common/dialog'
import { Can } from '~/users'
import { PortfolioAddWalletDialog } from './common'
import * as model from './portfolio.model'

export type PortfolioProps = unknown

export const Portfolio: React.VFC<PortfolioProps> = () => {
  const [openAddWalletDialog] = useDialog(PortfolioAddWalletDialog)

  const handleOpenAddWalletDialog = async () => {
    try {
      const res = await openAddWalletDialog()

      model.addWalletFx(res)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  return (
    <AppLayout>
      <PortfolioSummaryOfTokens />
      <PortfolioChartOfAllTokens />
      <PortfolioBlockchains />
      <Can I="create" a="Wallet">
        <Button onClick={handleOpenAddWalletDialog}>add wallet</Button>
      </Can>
    </AppLayout>
  )
}
