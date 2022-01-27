import clsx from 'clsx'
import { useState } from 'react'
import { useGate, useStore } from 'effector-react'
import isEmpty from 'lodash.isempty'

import { ButtonBase } from '~/common/button-base'
import { Dropdown } from '~/common/dropdown'
import { Icon } from '~/common/icon'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { settingsWalletModel } from '~/settings/settings-wallets'
import { PortfolioAssetCard, PortfolioAssetsHeader } from '../common'
import { PortfolioPlatformCard } from '~/portfolio/common/portfolio-platform-card'
import * as styles from './portfolio-assets.css'
import * as portfolioAssetsModel from '~/portfolio/portfolio-assets/portfolio-assets.model'
import { Loader } from '~/common/loader'
import { Link } from '~/common/link'

export type PortfolioAssetsProps = {
  className?: string
}

export const PortfolioAssets: React.VFC<PortfolioAssetsProps> = (props) => {
  const assets = useStore(portfolioAssetsModel.$assets)
  const assetsByWallet = useStore(portfolioAssetsModel.$assetsByWallet)
  const wallets = useStore(settingsWalletModel.$wallets)
  const assetListLoading = useStore(
    portfolioAssetsModel.fetchAssetsListFx.pending
  )
  const assetByWalletLoading = useStore(
    portfolioAssetsModel.fetchAssetsByWalletFx.pending
  )
  const platformsLoading = useStore(
    portfolioAssetsModel.fetchUserInteractedProtocolsListFx.pending
  )

  const assetsByPlatform = useStore(portfolioAssetsModel.$assetsByPlatform)
  const openedPlatform = useStore(portfolioAssetsModel.$openedPlatform)
  const assetsByPlatformLoading = useStore(
    portfolioAssetsModel.fetchAssetsByPlatformFx.pending
  )

  const assetsLoading = assetListLoading || assetByWalletLoading

  const [currentTab, setCurrentTab] = useState(0)
  const [currentWallet, setWallet] = useState<typeof wallets[number] | null>(
    null
  )
  const protocols = useStore(portfolioAssetsModel.$protocols)

  const handleSetWallet = (wallet: typeof wallets[number] | null) => () => {
    setWallet(wallet)
  }

  useGate(portfolioAssetsModel.PortfolioAssetsGate, currentWallet?.id ?? null)

  const currentAssets = currentWallet ? assetsByWallet : assets

  return (
    <div className={clsx(styles.root, props.className)}>
      <div className={styles.header}>
        <Typography
          onClick={() => setCurrentTab(0)}
          variant="h3"
          className={clsx(currentTab !== 0 ? styles.inactiveTab : null)}
        >
          Assets {assets.length}
        </Typography>
        <Typography
          onClick={() => setCurrentTab(1)}
          variant="h3"
          className={clsx(currentTab !== 1 ? styles.inactiveTab : null)}
        >
          Platforms {protocols.length}
        </Typography>
      </div>
      <div className={styles.tableWrap}>
        {currentTab === 0 && (
          <Paper radius={8} className={styles.table}>
            <div className={styles.tableHeader}>
              <Dropdown
                control={(active) => (
                  <ButtonBase>
                    {currentWallet?.name ?? 'All wallets'}
                    <Icon
                      icon={active ? 'arrowTop' : 'arrowDown'}
                      width="16"
                      className={styles.selectArrow}
                    />
                  </ButtonBase>
                )}
                placement="bottom-start"
                className={styles.select}
              >
                <ButtonBase
                  className={clsx(
                    styles.selectOption,
                    !currentWallet && styles.selectOptionActive
                  )}
                  onClick={handleSetWallet(null)}
                >
                  All wallets
                </ButtonBase>
                {wallets.map((wallet) => (
                  <ButtonBase
                    key={wallet.id}
                    className={clsx(
                      styles.selectOption,
                      currentWallet?.id === wallet.id &&
                        styles.selectOptionActive
                    )}
                    onClick={handleSetWallet(wallet)}
                  >
                    {wallet.name}
                  </ButtonBase>
                ))}
              </Dropdown>
            </div>
            <PortfolioAssetsHeader className={styles.assetHeader} />
            <div className={styles.tableBody}>
              {assetsLoading && (
                <div className={styles.loader}>
                  <Loader height="36" />
                </div>
              )}
              {!assetsLoading &&
                isEmpty(currentAssets) &&
                'Your wallets are empty'}

              {!assetsLoading &&
                !isEmpty(currentAssets) &&
                currentAssets.map((row, rowIndex) => (
                  <PortfolioAssetCard key={String(rowIndex)} row={row} />
                ))}
            </div>
          </Paper>
        )}

        {currentTab === 1 && (
          <Paper radius={8} className={styles.platformsTable}>
            <div
              className={clsx(styles.tableHeadings, styles.platformsTableRow)}
            >
              <Typography variant="body3" className={styles.tableCol}>
                Name
              </Typography>
              <Typography
                variant="body3"
                className={styles.tableCol}
                align="right"
              >
                My APY
              </Typography>
              <Typography
                variant="body3"
                className={styles.tableCol}
                align="right"
              >
                My position
              </Typography>
              <Typography
                variant="body3"
                className={styles.tableCol}
                align="right"
              >
                My profit
              </Typography>
            </div>
            <div className={styles.platformsTableBody}>
              {platformsLoading && (
                <div className={styles.loader}>
                  <Loader height="36" />
                </div>
              )}
              {!platformsLoading && isEmpty(protocols) && (
                <Typography variant="body2" className={styles.nodata}>
                  no data
                </Typography>
              )}
              {!platformsLoading && !isEmpty(protocols) && (
                <>
                  <PortfolioAssetsHeader />
                  {protocols.map((row, rowIndex) => (
                    <PortfolioPlatformCard
                      assets={assetsByPlatform}
                      isCollapsed={openedPlatform === row.id}
                      loading={assetsByPlatformLoading}
                      key={String(rowIndex)}
                      onToggle={() =>
                        portfolioAssetsModel.openPlatform(
                          openedPlatform === row.id ? null : row.id
                        )
                      }
                      protocol={row}
                    />
                  ))}
                </>
              )}
            </div>
          </Paper>
        )}
      </div>
      <Typography align="right" variant="body3" className={styles.copyright}>
        Powered by{' '}
        <Link target="_blank" href="https://moralis.io/" underline="always">
          Moralis.io
        </Link>
      </Typography>
    </div>
  )
}
