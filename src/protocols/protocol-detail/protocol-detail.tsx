import React from 'react'
import { useParams } from 'react-router-dom'
import { useGate, useStore } from 'effector-react'
import clsx from 'clsx'

import { AppLayout } from '~/layouts'
import { Typography } from '~/common/typography'
import { Link } from '~/common/link'
import { Paper } from '~/common/paper'
import { Tabs, Tab, TabPanel } from '~/common/tabs'
import { StakingList } from '~/staking/staking-list'
import { ProtocolMetrics } from '~/protocols/protocol-metrics'
import { clearLink } from '~/protocols/common'
import { ButtonBase } from '~/common/button-base'
import { Button } from '~/common/button'
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

const LINKS = [
  {
    title: 'bondappetit.io',
    href: '#',
  },
  {
    title: 'Whitepaper',
    href: '#',
  },
  {
    title: 'Docs',
    href: '#',
  },
]

const SOCIALS = [
  {
    title: 'Telegram',
    href: '#',
  },
  {
    title: 'Discord',
    href: '#',
  },
  {
    title: 'Twitter',
    href: '#',
  },
  {
    title: 'Medium',
    href: '#',
  },
  {
    title: 'Github',
    href: '#',
  },
]

const LISTINGS = [
  {
    title: 'CoinMARKETCAP',
    href: '#',
  },
  {
    title: 'Coingeko',
    href: '#',
  },
]

const AUDITS = [
  {
    title: 'MixBytes, 20 Jun 2021',
    href: '#',
  },
  {
    title: 'HashEx, 16 Aug 2021',
    href: '#',
  },
]

export const ProtocolDetail: React.FC = () => {
  const params = useParams<{ protocolId: string }>()
  useGate(model.ProtocolDetailGate, params)

  const protocol = useStore(model.$protocol)
  const loading = useStore(model.fetchProtocolFx.pending)

  return (
    <AppLayout>
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
            <Tab>Automations</Tab>
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
              <Typography variant="h3" className={styles.subtitle}>
                Statistics
              </Typography>
              <Paper radius={8} className={styles.mb120}>
                <ProtocolMetrics />
              </Paper>
              <Typography variant="h3" className={styles.subtitle}>
                Staking contracts
              </Typography>
              <Paper radius={8}>
                <StakingList protocolId={params.protocolId} />
              </Paper>
            </TabPanel>
            <TabPanel>
              <Paper radius={8} className={clsx(styles.card, styles.overview)}>
                <div>
                  <Typography variant="body2">
                    {protocol.description}
                  </Typography>
                  <ButtonBase className={styles.grey}>Show more</ButtonBase>
                </div>
                <div>
                  <div className={styles.overviewItem}>
                    <Typography
                      variant="body2"
                      className={styles.overviewTitles}
                    >
                      Links
                    </Typography>
                    {LINKS.map((link) => (
                      <Link
                        href={link.href}
                        key={link.title}
                        target="_blank"
                        className={styles.tag}
                      >
                        {link.title}
                      </Link>
                    ))}
                  </div>
                  <div className={styles.overviewItem}>
                    <Typography
                      variant="body2"
                      className={styles.overviewTitles}
                    >
                      Socials
                    </Typography>
                    {SOCIALS.map((social) => (
                      <Link
                        href={social.href}
                        key={social.title}
                        target="_blank"
                        className={styles.tag}
                      >
                        {social.title}
                      </Link>
                    ))}
                  </div>
                  <div className={styles.overviewItem}>
                    <Typography
                      variant="body2"
                      className={styles.overviewTitles}
                    >
                      Listings
                    </Typography>
                    {LISTINGS.map((listing) => (
                      <Link
                        href={listing.href}
                        key={listing.title}
                        target="_blank"
                        className={styles.tag}
                      >
                        {listing.title}
                      </Link>
                    ))}
                  </div>
                  <div>
                    <Typography
                      variant="body2"
                      className={styles.overviewTitles}
                    >
                      Audits
                    </Typography>
                    {AUDITS.map((audit) => (
                      <div key={audit.title}>
                        <Link
                          href={audit.href}
                          target="_blank"
                          className={styles.grey}
                        >
                          {audit.title}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </Paper>
            </TabPanel>
            <TabPanel>
              <Paper radius={8}>Automations</Paper>
            </TabPanel>
          </Tabs>
        </>
      )}
    </AppLayout>
  )
}
