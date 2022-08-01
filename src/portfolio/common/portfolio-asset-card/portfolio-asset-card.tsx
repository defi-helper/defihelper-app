import clsx from 'clsx'

import React from 'react'
import { bignumberUtils } from '~/common/bignumber-utils'
import { Typography } from '~/common/typography'
import {
  PortfolioAssetByProtocolFragment,
  PortfolioAssetByWalletFragment,
  PortfolioAssetFragment,
  TokenAliasLiquidityEnum,
} from '~/api/_generated-types'
import * as styles from './portfolio-asset-card.css'

export type PortfolioAssetCardProps = {
  className?: string
  row:
    | PortfolioAssetByWalletFragment
    | PortfolioAssetFragment
    | PortfolioAssetByProtocolFragment
}

const PercentChangeRender: React.FC<{ value: string }> = ({ value }) => {
  const contibutedPercent = bignumberUtils.toFixed(
    bignumberUtils.mul(bignumberUtils.minus(value, 1), 100),
    2
  )

  const isPositive = bignumberUtils.gte(contibutedPercent, 0)

  if (
    contibutedPercent.replace(/\D/g, '') === '0' ||
    value.replace(/\D/g, '') === '0'
  ) {
    return <>-</>
  }

  if (bignumberUtils.gte(contibutedPercent, 1000)) {
    return <span className={styles.changePlus}>1000%+</span>
  }

  if (bignumberUtils.lte(contibutedPercent, -1000)) {
    return <span className={styles.changeMinus}>-1000%</span>
  }

  return (
    <span className={isPositive ? styles.changePlus : styles.changeMinus}>
      {isPositive && '+'}
      {contibutedPercent}%
    </span>
  )
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
        myUSDChange: asset.metric.usdChange,
      },
      tokenAlias: asset.tokenAlias,
    } as PortfolioAssetFragment
  }

  if (
    'liquidity' in asset &&
    asset.liquidity === TokenAliasLiquidityEnum.Trash
  ) {
    return null
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
      <Typography variant="body2" align="right">
        <PercentChangeRender value={asset.metric.myUSDChange.day} />
      </Typography>
      <Typography variant="body2" align="right">
        <PercentChangeRender value={asset.metric.myUSDChange.week} />
      </Typography>
    </div>
  )
}
