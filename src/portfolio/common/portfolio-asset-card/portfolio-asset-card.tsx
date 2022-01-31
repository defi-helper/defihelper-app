import clsx from 'clsx'

import { bignumberUtils } from '~/common/bignumber-utils'
import { Typography } from '~/common/typography'
import {
  PortfolioAssetByWalletFragment,
  PortfolioAssetFragment,
} from '~/graphql/_generated-types'
import * as styles from './portfolio-asset-card.css'

export type PortfolioAssetCardProps = {
  className?: string
  row: PortfolioAssetByWalletFragment | PortfolioAssetFragment
}

export const PortfolioAssetCard: React.VFC<PortfolioAssetCardProps> = (
  props
) => {
  let asset = props.row

  if ('tokenAlias' in asset) {
    asset = {
      ...asset.tokenAlias,
      metric: {
        myPortfolioPercent: asset.metric.portfolioPercent,
        myBalance: asset.metric.balance,
        myUSD: asset.metric.usd,
      },
    } as PortfolioAssetFragment
  }

  return (
    <div className={clsx(styles.root, props.className)}>
      <Typography variant="body2">
        {bignumberUtils.format(asset.metric.myPortfolioPercent, 2)}%
      </Typography>

      <Typography variant="body2" className={styles.assetName} as="div">
        {asset.logoUrl ? (
          <img
            src={asset.logoUrl}
            className={styles.assetLogo}
            alt={`${asset.name} logo`}
          />
        ) : (
          <div className={styles.assetLogoPlaceholder} />
        )}
        {asset.name} ({asset.symbol})
      </Typography>

      <Typography variant="body2" align="right">
        $
        {bignumberUtils.format(
          bignumberUtils.div(asset.metric.myUSD, asset.metric.myBalance)
        )}
      </Typography>
      <Typography variant="body2" align="right">
        {bignumberUtils.format(asset.metric.myBalance)}
      </Typography>
      <Typography variant="body2" align="right">
        ${bignumberUtils.format(asset.metric.myUSD)}
      </Typography>
    </div>
  )
}
