import { AppLayout } from '~/layouts'
import { PortfolioSummaryOfTokens } from '~/portfolio/portfolio-summary-of-tokens'
import { PortfolioChartOfAllTokens } from '~/portfolio/portfolio-chart-of-all-tokens'
import { useDialog } from '~/common/dialog'
import { Can } from '~/users'
import { Head } from '~/common/head'
import { Typography } from '~/common/typography'
import { PortfolioAddWalletDialog, PortfolioMetricCard } from './common'
import { bignumberUtils } from '~/common/bignumber-utils'
import { Button } from '~/common/button'
import { PortfolioAssets } from './portfolio-assets'
import * as model from './portfolio.model'
import * as styles from './portfolio.css'

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
      <Head title="Portfolio" />
      <Typography variant="h3" className={styles.title}>
        Portfolio
      </Typography>
      <div className={styles.cards}>
        <PortfolioMetricCard
          title="Total Net Worth"
          value={<>${bignumberUtils.format('1248726')}</>}
          growthValue={
            <>
              {bignumberUtils.format('24546')} ({bignumberUtils.format('6')}%)
            </>
          }
          positive
        />
        <PortfolioMetricCard
          title="Avg. APY total"
          value={<>{bignumberUtils.format('12')}%</>}
          growthValue={<>{bignumberUtils.format('-0.4')}</>}
          positive={false}
        />
        <PortfolioMetricCard
          title="Unclaimed reward"
          value={<>${bignumberUtils.format('527862')}</>}
          growthValue={
            <>
              {bignumberUtils.format('24546')} ({bignumberUtils.format('6')}%)
            </>
          }
          positive
        />
      </div>
      <PortfolioSummaryOfTokens />
      <PortfolioChartOfAllTokens />
      <PortfolioAssets />
      <Can I="create" a="Wallet">
        <Button color="blue" onClick={handleOpenAddWalletDialog}>
          + add wallet
        </Button>
      </Can>
    </AppLayout>
  )
}
