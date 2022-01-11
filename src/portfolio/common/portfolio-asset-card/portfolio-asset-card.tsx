import clsx from 'clsx'

import { bignumberUtils } from '~/common/bignumber-utils'
import { Typography } from '~/common/typography'
import { PortfolioAssetFragment } from '~/graphql/_generated-types'
import * as styles from './portfolio-asset-card.css'

export type PortfolioAssetCardProps = {
  className?: string
  row: PortfolioAssetFragment
}

export const PortfolioAssetCard: React.VFC<PortfolioAssetCardProps> = (
  props
) => {
  return (
    <div className={clsx(styles.root, props.className)}>
      <Typography variant="body2">
        {bignumberUtils.format(props.row.metric.myPortfolioPercent, 2)}%
      </Typography>

      <Typography variant="body2" className={styles.assetName} as="div">
        {props.row.logoUrl ? (
          <img
            src={props.row.logoUrl}
            className={styles.assetLogo}
            alt={`${props.row.name} logo`}
          />
        ) : (
          <div className={styles.assetLogoPlaceholder} />
        )}
        {props.row.name} ({props.row.symbol})
      </Typography>

      <Typography variant="body2" align="right">
        {bignumberUtils.format(props.row.metric.myBalance)}
      </Typography>
      <Typography variant="body2" align="right">
        ${bignumberUtils.format(props.row.metric.myUSD)}
      </Typography>
    </div>
  )
}
