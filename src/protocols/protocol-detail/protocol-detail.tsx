import isEmpty from 'lodash.isempty'
import { useMedia } from 'react-use'
import { useParams } from 'react-router-dom'
import { useGate, useStore } from 'effector-react'
import clsx from 'clsx'

import { AppLayout } from '~/layouts'
import { Typography } from '~/common/typography'
import { Link } from '~/common/link'
import { Button } from '~/common/button'
import { Paper } from '~/common/paper'
import { Tabs, Tab, TabPanel } from '~/common/tabs'
import { StakingList } from '~/staking/staking-list'
import { ProtocolMetricEarnings } from '~/protocols/protocol-metric-earnings'
import { ProtocolMetricOverview } from '~/protocols/protocol-metric-overview'
import {
  clearLink,
  ProtocolDemandMetrics,
  ProtocolMediaActivity,
  ProtocolOverview,
  ProtocolTotal,
} from '~/protocols/common'
import { Head } from '~/common/head'
import { Icon } from '~/common/icon'
import { Carousel } from '~/common/carousel'
import { StakingAutomates } from '~/staking/staking-automates'
import { Loader } from '~/common/loader'
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

export const ProtocolDetail: React.FC = () => {
  const params = useParams<{ protocolId: string }>()

  useGate(model.ProtocolDetailGate, params)

  const protocol = useStore(model.$protocol)
  const loading = useStore(model.fetchProtocolFx.pending)

  return (
    <AppLayout
      title={
        loading ? (
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
        loading ? (
          'loading...'
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
        )
      }
    >
      <Head title={loading ? 'loading...' : protocol?.name} />
      {loading && !protocol && (
        <div className={styles.loader}>
          <Loader height="36" />
        </div>
      )}
      {!loading && protocol && (
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
          </div>
          <Tabs hashSaveState className={styles.tabs}>
            <Tab>Earnings</Tab>
            <Tab>Overview</Tab>
            <TabPanel>
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
                        <Button variant="outlined">Create notification</Button>
                      )}
                    </Paper>
                  ))}
                </Grid>
              )}
              <ProtocolMetricEarnings
                className={styles.mb120}
                metric={protocol.metric}
                myMinUpdatedAt={protocol.metric.myMinUpdatedAt}
              >
                <ProtocolTotal
                  {...protocol.metric}
                  hasAutostaking={protocol.hasAutostaking}
                />
              </ProtocolMetricEarnings>
              <StakingAutomates
                className={styles.automates}
                protocolId={params.protocolId}
              />
              <StakingList
                protocolId={params.protocolId}
                protocolAdapter={protocol.adapter}
              />
            </TabPanel>
            <TabPanel>
              <ProtocolOverview
                className={clsx(styles.card, styles.mb120)}
                text={protocol.description}
                links={protocol.links}
              />
              <ProtocolMetricOverview className={styles.mb120} />
              {!isEmpty(protocol.socialPosts.list) && (
                <ProtocolMediaActivity
                  className={styles.mb120}
                  mediaActity={protocol.socialPosts.list ?? []}
                />
              )}
              <ProtocolDemandMetrics
                telegram={protocol.telegram}
                coingecko={protocol.coingecko}
                coinmarketcap={protocol.coinmarketcap}
                links={protocol.links}
              />
            </TabPanel>
          </Tabs>
        </>
      )}
    </AppLayout>
  )
}
