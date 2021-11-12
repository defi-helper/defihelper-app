import clsx from 'clsx'

import { AppLayout } from '~/layouts'
import { PortfolioEarnings } from '~/portfolio/portfolio-earnings'
import { PortfolioTotalWorth } from './portfolio-total-worth'
import { PortfolioCoinBalance } from './portfolio-coin-balance'
import { Head } from '~/common/head'
import { Typography } from '~/common/typography'
import { PortfolioMetricCards } from './portfolio-metric-cards'
import { PortfolioWallets } from './portfolio-wallets/portfolio-wallets'
import * as styles from './portfolio.css'

export type PortfolioProps = unknown

export const Portfolio: React.VFC<PortfolioProps> = () => {
  return (
    <AppLayout title="Portfolio">
      <Head title="Portfolio" />
      <Typography variant="h3" className={styles.title}>
        Portfolio
      </Typography>
      <PortfolioMetricCards className={styles.cards} />
      <div className={clsx(styles.grid, styles.section)}>
        <PortfolioTotalWorth className={styles.mainChart} />
        <PortfolioEarnings />
        <PortfolioCoinBalance />
      </div>
      <PortfolioWallets />
    </AppLayout>
  )
}
