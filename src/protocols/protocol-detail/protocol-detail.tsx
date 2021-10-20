import React from 'react'
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
} from '~/protocols/common'
import { Head } from '~/common/head'
import * as model from './protocol-detail.model'
import * as styles from './protocol-detail.css'

export type ProtocolDetailProps = {
  protocolId: string
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
    <AppLayout>
      <Head title={protocol?.name} />
      {loading && !protocol && 'loading...'}
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
          <Tabs>
            <Tab>Earnings</Tab>
            <Tab>Overview</Tab>
            <TabPanel>
              <div className={clsx(styles.grid, styles.mb120)}>
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
              </div>
              <ProtocolMetricEarnings className={styles.mb120} />
              <StakingList protocolId={params.protocolId} />
            </TabPanel>
            <TabPanel>
              <ProtocolOverview
                className={clsx(styles.card, styles.mb120)}
                text={protocol.description}
              />
              <ProtocolMetricOverview className={styles.mb120} />
              <ProtocolMediaActivity className={styles.mb120} />
              <ProtocolDemandMetrics />
            </TabPanel>
          </Tabs>
        </>
      )}
    </AppLayout>
  )
}
