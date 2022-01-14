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
import * as walletsModel from '~/settings/settings-wallets/settings-wallets.model'
import { Loader } from '~/common/loader'
import * as styles from './portfolio.css'
import * as model from './portfolio.model'
import {
  useOnWalletMetricUpdatedSubscription,
  useOnTokenMetricUpdatedSubscription,
} from '~/graphql/_generated-types'

export type PortfolioProps = unknown

const TIME = 15000

export const Portfolio: React.VFC<PortfolioProps> = () => {
  const tokenAliasses = useStore(model.$tokenAliasses)
  const loading = useStore(model.fetchTokenAliassesFx.pending)
  const wallets = useStore(walletsModel.$wallets)

  useGate(model.PortfolioGate)

  const walletIds = useMemo(() => wallets.map(({ id }) => id), [wallets])

  const [walletUpdated, onWalletMetricUpdated] =
    useOnWalletMetricUpdatedSubscription()
  const [tokenMetricUpdated, onTokenMetricUpdated] =
    useOnTokenMetricUpdatedSubscription()

  useEffect(() => {
    if (!walletIds.length) return

    const opts = {
      variables: {
        wallet: walletIds,
      },
    }

    onTokenMetricUpdated(opts)
    onWalletMetricUpdated(opts)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletIds])

  const walletUpdatedId = useThrottle(
    walletUpdated.data?.onWalletMetricUpdated.id ?? '',
    TIME
  )
  const tokenMetricUpdatedId = useThrottle(
    tokenMetricUpdated.data?.onTokenMetricUpdated.id ?? '',
    TIME
  )

  useEffect(() => {
    if (walletUpdatedId || tokenMetricUpdatedId) {
      model.portfolioUpdated()
    }
  }, [walletUpdatedId, tokenMetricUpdatedId])

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
