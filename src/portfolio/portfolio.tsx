import { cloneElement, useCallback, useEffect, useMemo, useState } from 'react'
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
import { ReactComponent as DollarIcon } from '~/assets/icons/dollar.svg'
import { ReactComponent as EasyIcon } from '~/assets/icons/easy.svg'
import { ReactComponent as WifiIcon } from '~/assets/icons/wifi.svg'
import * as styles from './portfolio.css'
import * as model from './portfolio.model'
import { Button } from '~/common/button'
import { Paper } from '~/common/paper'

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

const INSTRUCTION = [
  {
    title: 'Work offline',
    text: (
      <>
        Portfolio manager works even without a wallet connected: get analysis of
        protocols and token, recieve investment recommendations and management
        even before you connect
      </>
    ),
    button: (
      <Button color="green" size="small">
        learn more
      </Button>
    ),
    icon: WifiIcon,
  },
  {
    title: 'Easy to use. Easy to earn',
    text: (
      <>
        Create automated investment strategies without having to know coding:
        <Typography variant="inherit" className={styles.green}>
          &apos;Take Profit&apos;, &apos;Stop Loss&apos;, &apos;Send a
          Notification If
        </Typography>{' '}
        {'<'}Condition{'>'} and many others already available at automation
        wizard
      </>
    ),
    button: (
      <Button color="green" size="small">
        try automations
      </Button>
    ),
    icon: EasyIcon,
  },
  {
    title: 'Earn more. Much more',
    text: (
      <>
        The auto-staking feature increases your profits by restaking tokens
        exactly when rewards are higher than the fees. Earn up to{' '}
        <Typography variant="inherit" className={styles.green}>
          168%
        </Typography>{' '}
        more!
      </>
    ),
    button: (
      <Button color="green" size="small">
        try automations
      </Button>
    ),
    icon: DollarIcon,
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

      {!portfolioCollected && (
        <>
          <Joyride
            run={run}
            steps={STEPS}
            continuous
            scrollToFirstStep
            callback={handleJoyrideCallback}
            disableCloseOnEsc
            disableOverlayClose
            disableOverlay
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
      {!(!loading && !portfolioCollected) && (
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
            Your portfolio is generating now...
          </Typography>
          <div className={styles.instructions}>
            {INSTRUCTION.map((instructionItem) => (
              <Paper
                key={instructionItem.title}
                radius={8}
                className={styles.instructionCard}
              >
                <Typography className={styles.instructionCardTitle}>
                  {instructionItem.title}
                </Typography>
                <Typography
                  variant="body2"
                  className={styles.instructionCardText}
                >
                  {instructionItem.text}
                </Typography>
                {cloneElement(instructionItem.button, {
                  className: styles.instructionCardButton,
                })}
                <instructionItem.icon className={styles.instructionCardIcon} />
              </Paper>
            ))}
          </div>
          <LazyLoad height={HEIGHT}>
            <SettingsContacts withHeader={false} />
          </LazyLoad>
        </>
      )}
    </AppLayout>
  )
}
