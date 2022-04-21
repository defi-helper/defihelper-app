import clsx from 'clsx'

import { bignumberUtils } from '~/common/bignumber-utils'
import { Typography } from '~/common/typography'
import { ButtonBase } from '~/common/button-base'
import { Icon } from '~/common/icon'
import { PortfolioAssetCard } from '~/portfolio/common'
import { Loader } from '~/common/loader'
import {
  PortfolioAssetByProtocolFragment,
  PortfolioProtocolsQuery,
} from '~/graphql/_generated-types'
import { PortfolioAssetsHeader } from '../portfolio-assets-header'
import * as styles from './portfolio-platform-card.css'

export type PortfolioAssetCardProps = {
  className?: string
  protocol: Exclude<
    PortfolioProtocolsQuery['protocols']['list'],
    null | undefined
  >[number]
  assets: PortfolioAssetByProtocolFragment[]
  loading: boolean
  isCollapsed: boolean
  onToggle: () => void
}

export const PortfolioPlatformCard: React.VFC<PortfolioAssetCardProps> = (
  props
) => {
  return (
    <>
      <div
        className={clsx(
          styles.root,
          props.className,
          props.isCollapsed ? styles.rootActive : null
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

          <ButtonBase onClick={() => props.onToggle()}>
            <Icon
              icon={`arrow${props.isCollapsed ? 'Up' : 'Down'}`}
              width="24"
              height="24"
            />
          </ButtonBase>
        </div>

        <div
          className={clsx(
            styles.platformAssetsList,
            props.isCollapsed ? styles.platformAssetsListUnCollapsed : null
          )}
        >
          <div className={styles.tableBody}>
            <PortfolioAssetsHeader />
            {props.loading && (
              <div className={clsx(styles.loadingWrapper)}>
                <Loader height="16" />
              </div>
            )}

            {!props.assets.length && !props.loading && (
              <Typography variant="body2" as="div" align="center">
                No assets found
              </Typography>
            )}

            {props.assets.map((row, i) => (
              <PortfolioAssetCard key={String(i)} row={row} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
