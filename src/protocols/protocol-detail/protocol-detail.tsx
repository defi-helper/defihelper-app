import { useMemo, useEffect } from 'react'
import { useMedia, useThrottle } from 'react-use'
import {
  useParams,
  Switch,
  Route,
  NavLink as ReactRouterLink,
  Redirect,
  useRouteMatch,
} from 'react-router-dom'
import { useGate, useStore } from 'effector-react'
import clsx from 'clsx'
import LazyLoad from 'react-lazyload'

import { AppLayout } from '~/layouts'
import { authModel, Can } from '~/auth'
import { Typography } from '~/common/typography'
import { Link } from '~/common/link'
import { Button } from '~/common/button'
import { Paper } from '~/common/paper'
import { StakingList } from '~/staking/staking-list'
import { ProtocolCoinBalanceChart } from '~/protocols/protocol-coin-balance-chart'
import {
  clearLink,
  ProtocolTotal,
  ProtocolCharts,
  ProtocolLastUpdated,
} from '~/protocols/common'
import { ProtocolOverview } from '~/protocols/protocol-overview'
import { ProtocolDemandMetrics } from '~/protocols/protocol-demand-metrics'
import * as protocolOverviewModel from '~/protocols/protocol-overview/protocol-overview.model'
import { Head } from '~/common/head'
import { Icon } from '~/common/icon'
import { Carousel } from '~/common/carousel'
import { StakingAutomates } from '~/staking/staking-automates'
import { Loader } from '~/common/loader'
import { ButtonBase } from '~/common/button-base'
import { paths } from '~/paths'
import {
  useOnTokenMetricUpdatedSubscription,
  useOnWalletMetricUpdatedSubscription,
} from '~/graphql/_generated-types'
import { ProtocolEstimatedChart } from '~/protocols/protocol-estimated-chart'
import { ProtocolTvlChart } from '~/protocols/protocol-tvl-chart'
import { ProtocolUniqueWalletsChart } from '~/protocols/protocol-unique-wallets-chart'
import { ProtocolMediaActivity } from '../protocol-media-activity'
import * as model from './protocol-detail.model'
import * as styles from './protocol-detail.css'

export type ProtocolDetailProps = {
  protocolId: string
}

const Grid: React.FC = (props) => {
  const isDesktop = useMedia('(min-width: 960px)')

  return isDesktop ? (
    <div className={clsx(styles.grid, styles.mb120)}>{props.children}</div>
  ) : (
    <Carousel className={styles.carousel}>{props.children}</Carousel>
  )
}

const EARNINGS = [
  <>
    Your curent stake is <span className={styles.green}>↑12%</span> up to{' '}
    <span className={styles.lightGreen}>$216,397.2</span> for last week. Our
    model expects the growth of overall value because of growth of media
    activity and demand.
  </>,
  <>
    However be aware of huge <span className={styles.red}>drop</span> of BAG
    price, which is possible due to the recent whales activity in past 2 days.
  </>,
  <>
    Your curent stake is <span className={styles.green}>↑12%</span> up to{' '}
    <span className={styles.lightGreen}>$216,397.2</span> for last week. Our
    model expects the growth of overall value because of growth of media
    activity and demand.
  </>,
]

const HEIGHT = 300

export const ProtocolDetail: React.FC = () => {
  const params = useParams<{ protocolId: string }>()

  useGate(model.ProtocolDetailGate, params)

  const protocol = useStore(model.$protocol)
  const loading = useStore(model.fetchProtocolFx.pending)
  const overview = useStore(protocolOverviewModel.$overview)

  const match = useRouteMatch()
  const user = useStore(authModel.$user)

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

  const metricUpdated = useThrottle(
    walletUpdated.data?.onWalletMetricUpdated.id ||
      tokenMetricUpdated.data?.onTokenMetricUpdated.id ||
      '',
    15000
  )

  useEffect(() => {
    if (metricUpdated) {
      model.updated()
    }
  }, [metricUpdated])

  return (
    <AppLayout
      title={
        loading && !protocol ? (
          'loading...'
        ) : (
          <div>
            {protocol?.icon && (
              <img src={protocol?.icon} alt="" className={styles.icon} />
            )}
            {protocol?.name}
          </div>
        )
      }
      action={
        <>
          {loading && !protocol ? (
            ''
          ) : (
            <Paper
              target="_blank"
              href={protocol?.link}
              as={Link}
              radius={8}
              className={styles.protocolLink}
            >
              <Icon icon="link" width="16" height="16" />
            </Paper>
          )}
        </>
      }
    >
      <Head
        title={loading && !protocol ? 'loading...' : protocol?.name}
        ogImageUrl={`https://backend.defihelper.io/protocol/opengraph-preview/${params.protocolId}`}
        ogUrl={`https://app.defihelper.io/protocols/${params.protocolId}`}
        description={
          protocol?.name
            ? `${protocol?.name} auto compound with our auto-staking feature. Automate your DeFi strategies across chains, earn more - DeFiHelper`
            : undefined
        }
      />
      {loading && !protocol && (
        <div className={styles.loader}>
          <Loader height="36" />
        </div>
      )}
      {protocol && (
        <>
          <div className={styles.header}>
            {protocol.icon && (
              <img src={protocol.icon} alt="" className={styles.icon} />
            )}
            <Typography variant="h4">{protocol.name}</Typography>
            {protocol.link && (
              <Paper
                target="_blank"
                href={protocol.link}
                as={Link}
                radius={8}
                className={styles.protocolLink}
              >
                {clearLink(protocol.link)}
              </Paper>
            )}
            <Can I="update" a="Protocol">
              <ButtonBase
                as={ReactRouterLink}
                to={paths.protocols.update(params.protocolId)}
                className={styles.edit}
              >
                Edit
              </ButtonBase>
            </Can>
          </div>
          <div>
            <div className={styles.tabs}>
              <Link
                as={ReactRouterLink}
                className={styles.tab}
                activeClassName={styles.tabActive}
                to={`${match.url}/earnings`}
              >
                Earnings
              </Link>
              <Link
                as={ReactRouterLink}
                className={styles.tab}
                activeClassName={styles.tabActive}
                to={`${match.url}/overview`}
              >
                Overview
              </Link>
            </div>
            <Switch>
              <Redirect exact from={match.path} to={`${match.path}/earnings`} />
              <Route path={`${match.path}/earnings`}>
                {false && (
                  <Grid>
                    {EARNINGS.map((earn, index) => (
                      <Paper
                        radius={8}
                        key={String(index)}
                        className={clsx(styles.card, styles.flex)}
                      >
                        <Typography className={styles.grey}>{earn}</Typography>
                        {index === 1 && (
                          <Button variant="outlined">
                            Create notification
                          </Button>
                        )}
                      </Paper>
                    ))}
                  </Grid>
                )}
                <ProtocolCharts>
                  <ProtocolCharts.Header>
                    <Typography variant="h3">Statistics</Typography>
                    {protocol.metric.myMinUpdatedAt && (
                      <ProtocolLastUpdated>
                        {protocol.metric.myMinUpdatedAt}
                      </ProtocolLastUpdated>
                    )}
                  </ProtocolCharts.Header>
                  <LazyLoad height={HEIGHT}>
                    <ProtocolCoinBalanceChart />
                  </LazyLoad>
                  <LazyLoad height={HEIGHT}>
                    <ProtocolEstimatedChart metric={protocol.metric} />
                  </LazyLoad>
                </ProtocolCharts>
                <LazyLoad height={HEIGHT} className={styles.mb120}>
                  <ProtocolTotal
                    {...protocol.metric}
                    hasAutostaking={protocol.hasAutostaking}
                  />
                </LazyLoad>
                <LazyLoad height={HEIGHT} className={styles.automates}>
                  <StakingAutomates protocolId={params.protocolId} />
                </LazyLoad>
                <LazyLoad height={HEIGHT}>
                  <StakingList
                    protocolId={params.protocolId}
                    protocolAdapter={protocol.adapter}
                  />
                </LazyLoad>
              </Route>
              <Route path={`${match.path}/overview`}>
                <LazyLoad height={HEIGHT} className={styles.mb120}>
                  <ProtocolOverview
                    protocolId={params.protocolId}
                    className={styles.card}
                  />
                </LazyLoad>
                <ProtocolCharts className={styles.mb120}>
                  <ProtocolCharts.Header>
                    <Typography variant="h3">Statistics</Typography>
                    {protocol.metric.myMinUpdatedAt && (
                      <ProtocolLastUpdated>
                        {protocol.metric.myMinUpdatedAt}
                      </ProtocolLastUpdated>
                    )}
                  </ProtocolCharts.Header>
                  <LazyLoad height={HEIGHT}>
                    <ProtocolTvlChart />
                  </LazyLoad>
                  <LazyLoad>
                    <ProtocolUniqueWalletsChart />
                  </LazyLoad>
                </ProtocolCharts>
                <LazyLoad height={HEIGHT} className={styles.mb120}>
                  <ProtocolMediaActivity />
                </LazyLoad>
                <LazyLoad height={HEIGHT}>
                  <ProtocolDemandMetrics
                    links={overview?.links}
                    protocolId={params.protocolId}
                  />
                </LazyLoad>
              </Route>
            </Switch>
          </div>
        </>
      )}
    </AppLayout>
  )
}
