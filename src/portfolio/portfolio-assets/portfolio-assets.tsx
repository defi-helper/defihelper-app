import clsx from 'clsx'
import { useState } from 'react'
import { useGate, useStore } from 'effector-react'
import isEmpty from 'lodash.isempty'
import { Link as ReactRouterLink } from 'react-router-dom'

import { ButtonBase } from '~/common/button-base'
import { Dropdown } from '~/common/dropdown'
import { Icon } from '~/common/icon'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { settingsWalletModel } from '~/settings/settings-wallets'
import { PortfolioAssetCard, PortfolioAssetsHeader } from '../common'
import { PortfolioPlatformCard } from '~/portfolio/common/portfolio-platform-card'
import { Loader } from '~/common/loader'
import { Link } from '~/common/link'
import { useDialog } from '~/common/dialog'
import { PortfolioDebugInfoDialog } from '~/portfolio/common/portfolio-debug-info-dialog'
import * as styles from './portfolio-assets.css'
import * as portfolioAssetsModel from '~/portfolio/portfolio-assets/portfolio-assets.model'
import { paths } from '~/paths'

export type PortfolioAssetsProps = {
  className?: string
}

export const PortfolioAssets: React.VFC<PortfolioAssetsProps> = (props) => {
  const [showAll, setShowAll] = useState(false)
  const assets = useStore(portfolioAssetsModel.$assets)
  const assetsDebug = useStore(portfolioAssetsModel.$assetsDebug)
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

  const [openPortfolioDebugInfo] = useDialog(PortfolioDebugInfoDialog)
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

        <Typography
          onClick={() =>
            openPortfolioDebugInfo({ assets: assetsDebug }).catch(() => {})
          }
          className={styles.debugInfo}
        >
          debug info
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
                      icon={active ? 'arrowUp' : 'arrowDown'}
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
                (showAll ? currentAssets : currentAssets.slice(0, 10)).map(
                  (row, rowIndex) => (
                    <PortfolioAssetCard key={String(rowIndex)} row={row} />
                  )
                )}
              {!showAll && currentAssets.length > 10 && (
                <div className={styles.showAll}>
                  <ButtonBase
                    onClick={() => setShowAll(true)}
                    className={styles.showAllButton}
                  >
                    Show all <Icon icon="arrowDown" width="16" height="16" />
                  </ButtonBase>
                </div>
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
              {!platformsLoading && !isEmpty(protocols) && (
                <>
                  {protocols.map((row, rowIndex) => (
                    <PortfolioPlatformCard
                      key={String(rowIndex)}
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
        Powered by
        <Link
          target="_blank"
          href="https://debank.com/"
          underline="always"
          className={styles.copyrightLink}
        >
          <Icon
            icon="debank"
            width={17}
            height={20}
            className={styles.copyrightIcon}
          />
          DeBank
        </Link>
      </Typography>
      <Typography
        variant="body2"
        align="center"
        className={styles.createProposal}
      >
        Don&apos;t see your token?{' '}
        <Link color="blue" as={ReactRouterLink} to={paths.roadmap.list}>
          Create a proposal
        </Link>{' '}
        to whitelist your token
      </Typography>
    </div>
  )
}
