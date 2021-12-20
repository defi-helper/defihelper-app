import clsx from 'clsx'
import isEmpty from 'lodash.isempty'
import { useState } from 'react'

import { ButtonBase } from '~/common/button-base'
import { Typography } from '~/common/typography'
import { Link } from '~/common/link'
import { Paper } from '~/common/paper'
import { ProtocolLinkType } from '~/graphql/_generated-types'
import * as styles from './protocol-overview.css'

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

const MAX_CHARS = 596

export const ProtocolOverview: React.VFC<ProtocolOverviewProps> = (props) => {
  const [more, setMore] = useState(false)

  const handleSetMore = () => {
    setMore(!more)
  }

  return (
    <Paper radius={8} className={clsx(styles.overview, props.className)}>
      <div>
        <Typography variant="body2" className={styles.description}>
          {!more ? props.text?.substring(0, MAX_CHARS) : props.text}
        </Typography>
        {Number(props.text?.length) > MAX_CHARS && (
          <ButtonBase className={styles.grey} onClick={handleSetMore}>
            {!more ? 'Show more' : 'Show less'}
          </ButtonBase>
        )}
      </div>
      <div>
        {!isEmpty(props.links?.other) && (
          <LinkSection title="Links" links={props.links?.other} />
        )}
        {!isEmpty(props.links?.social) && (
          <LinkSection title="Socials" links={props.links?.social} />
        )}
        {!isEmpty(props.links?.listing) && (
          <LinkSection title="Listings" links={props.links?.listing} />
        )}
        {!isEmpty(props.links?.audit) && (
          <LinkSection title="Audits" links={props.links?.audit} />
        )}
      </div>
    </Paper>
  )
}
