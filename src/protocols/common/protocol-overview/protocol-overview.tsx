import clsx from 'clsx'

import { ButtonBase } from '~/common/button-base'
import { Typography } from '~/common/typography'
import { Link } from '~/common/link'
import { Paper } from '~/common/paper'
import * as styles from './protocol-overview.css'
import { ProtocolLinkType } from '~/graphql/_generated-types'

export type ProtocolOverviewProps = {
  className?: string
  text?: string
  links?: {
    social: ProtocolLinkType[]
    listing: ProtocolLinkType[]
    audit: ProtocolLinkType[]
    other: ProtocolLinkType[]
  }
}

const LinkSection: React.VFC<{ title: string; links?: ProtocolLinkType[] }> = (
  props
) => {
  return (
    <div className={styles.overviewItem}>
      <Typography variant="body2" className={styles.overviewTitles}>
        {props.title}
      </Typography>
      {props.links?.map((link) => (
        <Link
          href={link.value}
          key={link.id}
          target="_blank"
          className={styles.tag}
        >
          {link.name}
        </Link>
      ))}
    </div>
  )
}

export const ProtocolOverview: React.VFC<ProtocolOverviewProps> = (props) => {
  return (
    <Paper radius={8} className={clsx(styles.overview, props.className)}>
      <div>
        <Typography variant="body2">{props.text}</Typography>
        <ButtonBase className={styles.grey}>Show more</ButtonBase>
      </div>
      <div>
        <LinkSection title="Links" links={props.links?.other} />
        <LinkSection title="Socials" links={props.links?.social} />
        <LinkSection title="Listings" links={props.links?.listing} />
        <LinkSection title="Audits" links={props.links?.audit} />
      </div>
    </Paper>
  )
}
