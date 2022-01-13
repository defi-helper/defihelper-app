import clsx from 'clsx'

import { bignumberUtils } from '~/common/bignumber-utils'
import { Typography } from '~/common/typography'
import { PortfolioAssetByWalletFragment } from '~/graphql/_generated-types'
import * as styles from './portfolio-wallet-asset-card.css'

export type PortfolioAssetCardProps = {
  className?: string
  row: PortfolioAssetByWalletFragment
}

export const PortfolioWalletAssetCard: React.VFC<PortfolioAssetCardProps> = (
  props
) => {
  return (
    <div className={clsx(styles.root, props.className)}>
      <Typography variant="body2">
        {bignumberUtils.format(props.row.metric.portfolioPercent, 2)}%
      </Typography>

      <Typography variant="body2" className={styles.assetName} as="div">
        {props.row.tokenAlias.logoUrl ? (
          <img
            src={props.row.tokenAlias.logoUrl}
            className={styles.assetLogo}
            alt={`${props.row.tokenAlias.name} logo`}
          />
        ) : (
          <div className={styles.assetLogoPlaceholder} />
        )}
        {props.row.tokenAlias.name} ({props.row.tokenAlias.symbol})
      </Typography>

      <Typography variant="body2" align="right">
        {bignumberUtils.format(props.row.metric.balance)}
      </Typography>
      <Typography variant="body2" align="right">
        ${bignumberUtils.format(props.row.metric.usd)}
      </Typography>
    </div>
  )
}
