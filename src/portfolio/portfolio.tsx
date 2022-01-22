import { useEffect, useMemo } from 'react'
import clsx from 'clsx'
import { useGate, useStore } from 'effector-react'
import { useThrottle } from 'react-use'

import { AppLayout } from '~/layouts'
import { PortfolioEarnings } from '~/portfolio/portfolio-earnings'
import { PortfolioTotalWorth } from './portfolio-total-worth'
import { PortfolioCoinBalance } from './portfolio-coin-balance'
import { Head } from '~/common/head'
import { Typography } from '~/common/typography'
import { PortfolioMetricCards } from './portfolio-metric-cards'
import { PortfolioWallets } from './portfolio-wallets/portfolio-wallets'
import { PortfolioAssets } from './portfolio-assets'
import { PortfolioDeployedContracts } from './portfolio-deployed-contracts'
import { SettingsContacts } from '~/settings/settings-contacts'
import { settingsWalletModel } from '~/settings/settings-wallets'
import { Loader } from '~/common/loader'
import {
  useOnWalletMetricUpdatedSubscription,
  useOnTokenMetricUpdatedSubscription,
  useOnWalletCreatedSubscription,
} from '~/graphql/_generated-types'
import { authModel } from '~/auth'
import * as styles from './portfolio.css'
import * as model from './portfolio.model'

export type PortfolioProps = unknown

const TIME = 15000

export const Portfolio: React.VFC<PortfolioProps> = () => {
  const tokenAliasses = useStore(model.$tokenAliasses)
  const loading = useStore(model.fetchTokenAliassesFx.pending)

  const user = useStore(authModel.$user)

  useGate(model.PortfolioGate)

  const subscriptionOptions = useMemo(() => {
    if (!user) return undefined

    return {
      variables: {
        user: [user.id],
      },
    }
  }, [user])

  const [walletUpdated] =
    useOnWalletMetricUpdatedSubscription(subscriptionOptions)
  const [tokenMetricUpdated] =
    useOnTokenMetricUpdatedSubscription(subscriptionOptions)
  const [walletCreated] = useOnWalletCreatedSubscription(subscriptionOptions)

  const metricUpdated = useThrottle(
    walletUpdated.data?.onWalletMetricUpdated.id ||
      tokenMetricUpdated.data?.onTokenMetricUpdated.id ||
      walletCreated.data?.onWalletCreated.id ||
      '',
    TIME
  )

  useEffect(() => {
    if (metricUpdated) {
      model.portfolioUpdated()
      settingsWalletModel.updated()
    }
  }, [metricUpdated])

  return (
    <AppLayout title="Portfolio">
      <Head title="Portfolio" />
      {loading && !tokenAliasses && (
        <div className={styles.loader}>
          <Loader height="36" />
        </div>
      )}

      {Boolean(tokenAliasses) && (
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
          <PortfolioWallets className={styles.section} />
          <PortfolioDeployedContracts />
        </>
      )}
      {!loading && !tokenAliasses && (
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
            Building process can take up to 24 hours. Add contacts so you can
            recieve notifications about any actions. You will be notified when
            portfolio is ready. You will be able to change it any time in
            settings.
          </Typography>
          <SettingsContacts withHeader={false} />
        </>
      )}
    </AppLayout>
  )
}
