import clsx from 'clsx'

import { bignumberUtils } from '~/common/bignumber-utils'
import { Typography } from '~/common/typography'
import { PortfolioProtocolsQuery } from '~/api/_generated-types'
import * as styles from './portfolio-platform-card.css'

export type PortfolioAssetCardProps = {
  className?: string
  protocol: Exclude<
    PortfolioProtocolsQuery['protocols']['list'],
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
            {props.protocol.name}
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
