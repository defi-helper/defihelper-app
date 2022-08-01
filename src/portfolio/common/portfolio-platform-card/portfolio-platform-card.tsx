import clsx from 'clsx'

import { Link as ReactRouterLink } from 'react-router-dom'
import { bignumberUtils } from '~/common/bignumber-utils'
import { Typography } from '~/common/typography'
import { PortfolioProtocolsQuery } from '~/api/_generated-types'
import * as styles from './portfolio-platform-card.css'
import { Link } from '~/common/link'
import { paths } from '~/paths'

export type PortfolioAssetCardProps = {
  className?: string
  protocol: Exclude<
    PortfolioProtocolsQuery['userProtocols']['list'],
    null | undefined
  >[number]
}

export const PortfolioPlatformCard: React.VFC<PortfolioAssetCardProps> = (
  props
) => {
  return (
    <>
      <div className={clsx(styles.root, props.className)}>
        <div className={styles.platformColumnsList}>
          <Typography variant="body2" className={styles.platformName}>
            {props.protocol.icon ? (
              <img
                src={props.protocol.icon}
                className={styles.platformLogo}
                alt={`${props.protocol.name} logo`}
              />
            ) : (
              <div className={styles.platformLogoPlaceholder} />
            )}
            <Link
              as={ReactRouterLink}
              to={
                props.protocol.adapter === 'debankByApiReadonly'
                  ? paths.protocols.detailReadonly(props.protocol.id)
                  : paths.protocols.detail(props.protocol.id)
              }
            >
              {props.protocol.name}
            </Link>
          </Typography>

          <Typography variant="body2" align="right">
            {bignumberUtils.format(props.protocol.metric.myAPY, 2)}%
          </Typography>
          <Typography variant="body2" align="right">
            ${bignumberUtils.format(props.protocol.metric.myStaked, 2)}
          </Typography>
          <Typography variant="body2" align="right">
            ${bignumberUtils.format(props.protocol.metric.myEarned, 2)}
          </Typography>
        </div>
      </div>
    </>
  )
}
