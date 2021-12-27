import clsx from 'clsx'
import { useGate, useStore } from 'effector-react'

import { AppLayout } from '~/layouts'
import { PortfolioEarnings } from '~/portfolio/portfolio-earnings'
import { PortfolioTotalWorth } from './portfolio-total-worth'
import { PortfolioCoinBalance } from './portfolio-coin-balance'
import { Head } from '~/common/head'
import { Typography } from '~/common/typography'
import { PortfolioMetricCards } from './portfolio-metric-cards'
import { PortfolioWallets } from './portfolio-wallets/portfolio-wallets'
import { PortfolioAssets } from './portfolio-assets'
import { SettingsContacts } from '~/settings/settings-contacts'
import { Loader } from '~/common/loader'
import * as styles from './portfolio.css'
import * as model from './portfolio.model'

export type PortfolioProps = unknown

export const Portfolio: React.VFC<PortfolioProps> = () => {
  const tokenAliasses = useStore(model.$tokenAliasses)
  const loading = useStore(model.fetchTokenAliasses.pending)

  useGate(model.PortfolioGate)

  return (
    <AppLayout title="Portfolio">
      <Head title="Portfolio" />
      <>
        {loading && (
          <div className={styles.loader}>
            <Loader height="36" />
          </div>
        )}
      </>
      <>
        {!loading && (
          <>
            {tokenAliasses ? (
              <>
                <Typography variant="h3" className={styles.title}>
                  Portfolio
                </Typography>
                <PortfolioMetricCards className={styles.cards} />
                <div className={clsx(styles.grid, styles.section)}>
                  <PortfolioTotalWorth className={styles.mainChart} />
                  <PortfolioEarnings />
                  <PortfolioCoinBalance />
                </div>
                <PortfolioAssets className={styles.section} />
                <PortfolioWallets />
              </>
            ) : (
              <>
                <Typography variant="h3" className={styles.title}>
                  Portfolio
                </Typography>
                <Typography
                  variant="h3"
                  family="mono"
                  transform="uppercase"
                  className={styles.generatingTitle}
                >
                  Generating Portfolio...
                </Typography>
                <Typography className={styles.generatingDescription}>
                  Building process can take up to 24 hours. Add contacts so you
                  can recieve notifications about any actions. You will be
                  notified when portfolio is ready. You will be able to change
                  it any time in settings.
                </Typography>
                <SettingsContacts withHeader={false} />
              </>
            )}
          </>
        )}
      </>
    </AppLayout>
  )
}
