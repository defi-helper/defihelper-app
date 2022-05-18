import { useCallback, useEffect, useMemo, useState } from 'react'
import clsx from 'clsx'
import { useGate, useStore } from 'effector-react'
import { useLocalStorage, useMedia, useMount } from 'react-use'
import LazyLoad, { LazyLoadProps } from 'react-lazyload'
import Joyride, { CallBackProps, STATUS, Step } from '@defihelper/react-joyride'

import { AppLayout } from '~/layouts'
import { PortfolioEarnings } from '~/portfolio/portfolio-earnings'
import { PortfolioTotalWorth } from './portfolio-total-worth'
import { PortfolioCoinBalance } from './portfolio-coin-balance'
import { Head } from '~/common/head'
import { Typography } from '~/common/typography'
import { PortfolioMetricCards } from './portfolio-metric-cards'
import { PortfolioWallets } from './portfolio-wallets/portfolio-wallets'
import { PortfolioAssets } from './portfolio-assets'
import {
  useOnTokenMetricUpdatedSubscription,
  useOnWalletMetricUpdatedSubscription,
} from './common'
import { PortfolioDeployedContracts } from './portfolio-deployed-contracts'
import { SettingsContacts } from '~/settings/settings-contacts'
import { settingsWalletModel } from '~/settings/settings-wallets'
import { Loader } from '~/common/loader'
import { authModel } from '~/auth'
import { PortfolioExchanges } from '~/portfolio/portfolio-exchanges'
import { useOnWalletCreatedSubscription } from '~/settings/common'
import { OnboardTooltip } from '~/common/onboard-tooltip'
import { theme } from '~/common/theme'
import * as styles from './portfolio.css'
import * as model from './portfolio.model'

export type PortfolioProps = unknown

const HEIGHT = 300

const STEPS: (Step & { action?: () => JSX.Element; closeButton?: string })[] = [
  {
    target: '.tracked_balance',
    content: 'Here you can see tokens in your wallets + staked tokens',
    placement: 'bottom',
    disableBeacon: true,
  },
  {
    target: `.tracked_apy`,
    content: 'Track average APY from staked tokens',
    placement: 'bottom',
  },
  {
    target: `.earnings`,
    content: 'Extra earning you may earn with auto-staking activated',
    placement: 'bottom',
  },
  {
    target: `.assets`,
    content: 'You assets across all chains',
    placement: 'top',
  },
  {
    target: `.wallets`,
    content: 'Connect as many wallets as you want',
    placement: 'bottom',
    closeButton: 'okay, thanks',
  },
]

const ForceRenderOrLazyLoad = (
  props: LazyLoadProps & { forceRender: boolean }
) => {
  const [alreadyRendered, setAlreadyRendered] = useState(false)

  useMount(() => {
    if (!props.forceRender) return

    setAlreadyRendered(props.forceRender)
  })

  return props.forceRender || alreadyRendered ? (
    <div className={props.className}>{props.children}</div>
  ) : (
    <LazyLoad height={HEIGHT} {...props} />
  )
}

export const Portfolio: React.VFC<PortfolioProps> = () => {
  const portfolioCollected = useStore(model.$portfolioCollected)
  const loading = useStore(model.fetchPortfolioCollectedFx.pending)

  const user = useStore(authModel.$user)

  const isDesktop = useMedia('(min-width: 960px)')

  const [runLocalStorage, setLocalStorage] = useLocalStorage(
    'portfolioOnBoarding',
    true
  )
  const [run, setRun] = useState(false)

  useEffect(() => {
    if (!portfolioCollected || !runLocalStorage || !isDesktop) return

    setRun(portfolioCollected)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portfolioCollected, runLocalStorage, isDesktop])

  const handleJoyrideCallback = useCallback((data: CallBackProps) => {
    const { status } = data

    if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
      setLocalStorage(false)
      setRun(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useGate(model.PortfolioGate)

  const variables = useMemo(() => {
    if (!user) return undefined

    return {
      user: [user.id],
    }
  }, [user])

  useOnTokenMetricUpdatedSubscription(({ data }) => {
    if (data?.onTokenMetricUpdated.id) {
      model.portfolioUpdated()
      settingsWalletModel.updated()
    }
  }, variables)
  useOnWalletMetricUpdatedSubscription(({ data }) => {
    if (data?.onWalletMetricUpdated.id) {
      model.portfolioUpdated()
      settingsWalletModel.updated()
    }
  }, variables)
  useOnWalletCreatedSubscription(({ data }) => {
    if (data?.onWalletCreated.id) {
      model.portfolioUpdated()
      settingsWalletModel.updated()
    }
  }, variables)

  return (
    <AppLayout title="Portfolio">
      <Head title="Portfolio" />
      {loading && !portfolioCollected && (
        <div className={styles.loader}>
          <Loader height="36" />
        </div>
      )}

      {portfolioCollected && (
        <>
          <Joyride
            run={run}
            steps={STEPS}
            continuous
            scrollToFirstStep
            callback={handleJoyrideCallback}
            floaterProps={{
              styles: {
                arrow: {
                  color: theme.colors.common.green1,
                },
              },
            }}
            tooltipComponent={OnboardTooltip}
          />
          <Typography variant="h3" className={styles.title}>
            Portfolio
          </Typography>
          <ForceRenderOrLazyLoad forceRender={Boolean(runLocalStorage)}>
            <PortfolioMetricCards className={styles.cards} />
          </ForceRenderOrLazyLoad>
          <div className={clsx(styles.grid, styles.section)}>
            <ForceRenderOrLazyLoad
              forceRender={Boolean(runLocalStorage)}
              className={styles.mainChart}
            >
              <PortfolioTotalWorth />
            </ForceRenderOrLazyLoad>
            <ForceRenderOrLazyLoad forceRender={Boolean(runLocalStorage)}>
              <PortfolioEarnings className="earnings" />
            </ForceRenderOrLazyLoad>
            <ForceRenderOrLazyLoad forceRender={Boolean(runLocalStorage)}>
              <PortfolioCoinBalance />
            </ForceRenderOrLazyLoad>
          </div>
          <ForceRenderOrLazyLoad
            forceRender={Boolean(runLocalStorage)}
            className={styles.section}
          >
            <PortfolioAssets className="assets" />
          </ForceRenderOrLazyLoad>
          <ForceRenderOrLazyLoad
            forceRender={Boolean(runLocalStorage)}
            className={styles.section}
          >
            <PortfolioWallets className="wallets" />
          </ForceRenderOrLazyLoad>
          <ForceRenderOrLazyLoad
            forceRender={Boolean(runLocalStorage)}
            className={styles.section}
          >
            <PortfolioDeployedContracts />
          </ForceRenderOrLazyLoad>
          <ForceRenderOrLazyLoad forceRender={Boolean(runLocalStorage)}>
            <PortfolioExchanges />
          </ForceRenderOrLazyLoad>
        </>
      )}
      {!loading && !portfolioCollected && (
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
            The building process can take up to 1 hour. Add contacts so you
            can recieve notifications about any actions. You will be notified
            when portfolio is ready. You will be able to change it any time in
            settings.
          </Typography>
          <LazyLoad height={HEIGHT}>
            <SettingsContacts withHeader={false} />
          </LazyLoad>
        </>
      )}
    </AppLayout>
  )
}
