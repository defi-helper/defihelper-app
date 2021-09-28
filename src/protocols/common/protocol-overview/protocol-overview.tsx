import clsx from 'clsx'

import { ButtonBase } from '~/common/button-base'
import { Typography } from '~/common/typography'
import { Link } from '~/common/link'
import { Paper } from '~/common/paper'
import * as styles from './protocol-overview.css'

export type ProtocolOverviewProps = {
  className?: string
  text?: string
}

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

export const ProtocolOverview: React.VFC<ProtocolOverviewProps> = (props) => {
  return (
    <Paper radius={8} className={clsx(styles.overview, props.className)}>
      <div>
        <Typography variant="body2">{props.text}</Typography>
        <ButtonBase className={styles.grey}>Show more</ButtonBase>
      </div>
      <div>
        <div className={styles.overviewItem}>
          <Typography variant="body2" className={styles.overviewTitles}>
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
          <Typography variant="body2" className={styles.overviewTitles}>
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
          <Typography variant="body2" className={styles.overviewTitles}>
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
          <Typography variant="body2" className={styles.overviewTitles}>
            Audits
          </Typography>
          {AUDITS.map((audit) => (
            <div key={audit.title}>
              <Link href={audit.href} target="_blank" className={styles.grey}>
                {audit.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Paper>
  )
}
