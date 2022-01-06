import clsx from 'clsx'

import { bignumberUtils } from '~/common/bignumber-utils'
import { Typography } from '~/common/typography'
import * as styles from './portfolio-platform-card.css'
import { Protocol } from '~/protocols/common'

export type PortfolioAssetCardProps = {
  className?: string
  row: Protocol
}

export const PortfolioPlatformCard: React.VFC<PortfolioAssetCardProps> = (
  props
) => {
  return (
    <div className={clsx(styles.root, props.className)}>
      <Typography variant="body2" className={styles.platformName}>
        {props.row.icon ? (
          <img
            src={props.row.icon}
            className={styles.platformLogo}
            alt={`${props.row.name} logo`}
          />
        ) : (
          <div className={styles.platformLogoPlaceholder} />
        )}
        {props.row.name}
      </Typography>

      <Typography variant="body2">
        {bignumberUtils.format(props.row.metric.myAPY, 2)}%
      </Typography>
      <Typography variant="body2">
        ${bignumberUtils.format(props.row.metric.myStaked, 2)}
      </Typography>
      <Typography variant="body2">
        ${bignumberUtils.format(props.row.metric.myEarned, 2)}
      </Typography>
    </div>
  )
}
