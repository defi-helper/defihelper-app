import clsx from 'clsx'

import React from 'react'
import { useStore } from 'effector-react'
import { bignumberUtils } from '~/common/bignumber-utils'
import { Typography } from '~/common/typography'
import * as styles from './portfolio-platform-card.css'
import { Protocol } from '~/protocols/common'
import { ButtonBase } from '~/common/button-base'
import { Icon } from '~/common/icon'
import * as portfolioAssetsModel from '~/portfolio/portfolio-assets/portfolio-assets.model'
import { PortfolioAssetCard } from '~/portfolio/common'
import { Loader } from '~/common/loader'

export type PortfolioAssetCardProps = {
  className?: string
  protocol: Protocol
}

export const PortfolioPlatformCard: React.VFC<PortfolioAssetCardProps> = (
  props
) => {
  const assetsByPlatform = useStore(portfolioAssetsModel.$assetsByPlatform)
  const openedPlatform = useStore(portfolioAssetsModel.$openedPlatform)
  const assetsLoading = useStore(
    portfolioAssetsModel.fetchAssetsByPlatformFx.pending
  )

  const handleOpenPlatform = () =>
    portfolioAssetsModel.openPlatform(
      openedPlatform === props.protocol.id ? null : props.protocol.id
    )

  return (
    <>
      <div
        className={clsx(
          styles.root,
          props.className,
          openedPlatform === props.protocol.id ? styles.rootActive : null
        )}
      >
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

          <ButtonBase onClick={handleOpenPlatform}>
            <Icon
              icon={`arrow${
                openedPlatform === props.protocol.id ? 'Top' : 'Down'
              }`}
              width="24"
              height="24"
            />
          </ButtonBase>
        </div>

        <div
          className={clsx(
            styles.platformAssetsList,
            openedPlatform === props.protocol.id
              ? styles.platformAssetsListUnCollapsed
              : null
          )}
        >
          <div className={styles.tableBody}>
            {assetsLoading && (
              <div className={clsx(styles.loadingWrapper)}>
                <Loader height="16" />
              </div>
            )}

            {!assetsByPlatform.length && !assetsLoading && (
              <Typography variant="body2" as="div" align="center">
                No assets found
              </Typography>
            )}

            {assetsByPlatform.map((row, rowIndex) => (
              <PortfolioAssetCard key={String(rowIndex)} row={row} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
