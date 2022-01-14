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
import { PortfolioAssetCard } from '../common'
import { PortfolioPlatformCard } from '~/portfolio/common/portfolio-platform-card'
import { PortfolioWalletAssetCard } from '~/portfolio/common/portfolio-wallet-asset-card'
import {
  PortfolioAssetByWalletFragment,
  PortfolioAssetFragment,
} from '~/graphql/_generated-types'
import * as styles from './portfolio-assets.css'
import * as portfolioAssetsModel from '~/portfolio/portfolio-assets/portfolio-assets.model'
import { Loader } from '~/common/loader'

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

  console.log(openedPlatform)

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
            <div className={clsx(styles.tableHeadings, styles.assetsTableRow)}>
              <Typography variant="body3" className={styles.tableCol}>
                %
              </Typography>
              <Typography variant="body3" className={styles.tableCol}>
                Asset
              </Typography>
              <Typography
                variant="body3"
                className={styles.tableCol}
                align="right"
              >
                Balance
              </Typography>
              <Typography
                variant="body3"
                className={styles.tableCol}
                align="right"
              >
                Value{' '}
                <Typography variant="inherit" className={styles.blue}>
                  Calc
                </Typography>{' '}
                <Dropdown
                  control={
                    <ButtonBase className={styles.question}>
                      <Icon icon="question" width="16" height="16" />
                    </ButtonBase>
                  }
                  placement="top"
                  className={styles.dropdown}
                  offset={[0, 8]}
                >
                  <Typography variant="body3">
                    <Typography variant="inherit" className={styles.blue}>
                      Calc
                    </Typography>{' '}
                    — Calculated value based on your amount of asset and its
                    price
                  </Typography>
                  <Typography variant="body3">
                    <Typography variant="inherit" className={styles.blue}>
                      Act
                    </Typography>{' '}
                    — Actual value you can exchange right now based on real
                    market liquidity
                  </Typography>
                </Dropdown>
              </Typography>
            </div>
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
                currentAssets.map((row, rowIndex) =>
                  // eslint-disable-next-line no-underscore-dangle
                  row.__typename === 'WalletTokenAliasType' ? (
                    <PortfolioWalletAssetCard
                      key={String(rowIndex)}
                      row={row as PortfolioAssetByWalletFragment}
                    />
                  ) : (
                    <PortfolioAssetCard
                      key={String(rowIndex)}
                      row={row as PortfolioAssetFragment}
                    />
                  )
                )}
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
              {!platformsLoading &&
                !isEmpty(protocols) &&
                protocols.map((row, rowIndex) => (
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
            </div>
          </Paper>
        )}
      </div>
    </div>
  )
}
