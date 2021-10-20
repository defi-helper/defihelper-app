import clsx from 'clsx'

import { AppLayout } from '~/layouts'
import { PortfolioChartOfAllTokens } from '~/portfolio/portfolio-chart-of-all-tokens'
import { Head } from '~/common/head'
import { Typography } from '~/common/typography'
import { PortfolioMetricCards } from './portfolio-metric-cards'
import { PortfolioAssets } from './portfolio-assets'
import { PortfolioWallets } from './portfolio-wallets/portfolio-wallets'
import * as styles from './portfolio.css'

export type PortfolioProps = unknown

export const Portfolio: React.VFC<PortfolioProps> = () => {
  return (
    <AppLayout>
      <Head title="Portfolio" />
      <Typography variant="h3" className={styles.title}>
        Portfolio
      </Typography>
      <PortfolioMetricCards className={styles.cards} />
      <div className={clsx(styles.grid, styles.section)}>
        <PortfolioChartOfAllTokens
          variant="total"
          className={styles.mainChart}
          id="total"
        >
          Total Net Worth Dynamics
        </PortfolioChartOfAllTokens>
        <PortfolioChartOfAllTokens variant="estimated" id="earnings">
          Estimated Earnings
        </PortfolioChartOfAllTokens>
        <PortfolioChartOfAllTokens variant="balance" id="balance">
          Coin Balance
        </PortfolioChartOfAllTokens>
      </div>
      <PortfolioAssets className={styles.section} />
      <PortfolioWallets />
    </AppLayout>
  )
}
