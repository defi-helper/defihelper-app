import clsx from 'clsx'
import isEmpty from 'lodash.isempty'
import { useState } from 'react'
import { useStore, useGate } from 'effector-react'

import { ButtonBase } from '~/common/button-base'
import { Typography } from '~/common/typography'
import { Link } from '~/common/link'
import { Paper } from '~/common/paper'
import { ProtocolLinkType } from '~/api/_generated-types'
import * as styles from './protocol-overview.css'
import * as model from './protocol-overview.model'

export type ProtocolOverviewProps = {
  className?: string
  protocolId: string
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
  const overview = useStore(model.$overview)

  const handleSetMore = () => {
    setMore(!more)
  }

  useGate(model.ProtocolDetailOverviewGate, props.protocolId)

  return (
    <Paper radius={8} className={clsx(styles.overview, props.className)}>
      <div>
        <Typography variant="body2" className={styles.description}>
          {!more
            ? overview?.description?.substring(0, MAX_CHARS)
            : overview?.description}
        </Typography>
        {Number(overview?.description?.length) > MAX_CHARS && (
          <ButtonBase className={styles.grey} onClick={handleSetMore}>
            {!more ? 'Show more' : 'Show less'}
          </ButtonBase>
        )}
      </div>
      <div>
        {!isEmpty(overview?.links?.other) && (
          <LinkSection title="Links" links={overview?.links?.other} />
        )}
        {!isEmpty(overview?.links?.social) && (
          <LinkSection title="Socials" links={overview?.links?.social} />
        )}
        {!isEmpty(overview?.links?.listing) && (
          <LinkSection title="Listings" links={overview?.links?.listing} />
        )}
        {!isEmpty(overview?.links?.audit) && (
          <LinkSection title="Audits" links={overview?.links?.audit} />
        )}
      </div>
    </Paper>
  )
}
