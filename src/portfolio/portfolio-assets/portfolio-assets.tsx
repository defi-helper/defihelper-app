import clsx from 'clsx'
import { useState } from 'react'

import { useGate, useStore } from 'effector-react'
import { ButtonBase } from '~/common/button-base'
import { Dropdown } from '~/common/dropdown'
import { Icon } from '~/common/icon'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import * as styles from './portfolio-assets.css'
import * as portfolioAssetsModel from '~/portfolio/portfolio-assets/portfolio-assets.model'
import { settingsWalletModel } from '~/settings/settings-wallets'
import { PortfolioAssetCard } from '../common'
import { PortfolioPlatformCard } from '~/portfolio/common/portfolio-platform-card'

export type PortfolioAssetsProps = {
  className?: string
}

export const PortfolioAssets: React.VFC<PortfolioAssetsProps> = (props) => {
  const assets = useStore(portfolioAssetsModel.$assets)
  const assetsByWallet = useStore(portfolioAssetsModel.$assetsByWallet)
  const protocols = useStore(portfolioAssetsModel.$protocols)

  const [currentWallet, setWallet] = useState('')
  const [currentTab, setCurrentTab] = useState(0)

  const handleSetWallet = (wallet: string) => () => {
    setWallet(wallet)
  }

  const wallets = useStore(settingsWalletModel.$wallets)

  useGate(portfolioAssetsModel.PortfolioAssetsGate, currentWallet)
  useGate(portfolioAssetsModel.PortfolioProtocolsGate)
  // todo introduce pagination and server-side asset percentage calculation

  console.log(protocols)

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
                    All wallets
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
                  onClick={handleSetWallet('')}
                >
                  All wallets
                </ButtonBase>
                {wallets.map((wallet) => (
                  <ButtonBase
                    className={clsx(
                      styles.selectOption,
                      currentWallet === wallet.id && styles.selectOptionActive
                    )}
                    onClick={handleSetWallet(wallet.id)}
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
              <Typography variant="body3" className={styles.tableCol}>
                Balance
              </Typography>
              <Typography variant="body3" className={styles.tableCol}>
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
              {(currentWallet ? assetsByWallet : assets).map(
                (row, rowIndex) => (
                  <PortfolioAssetCard key={String(rowIndex)} row={row} />
                )
              )}
            </div>
          </Paper>
        )}

        {currentTab === 1 && (
          <Paper radius={8} className={styles.table}>
            <div
              className={clsx(styles.tableHeadings, styles.platformsTableRow)}
            >
              <Typography variant="body3" className={styles.tableCol}>
                Name
              </Typography>
              <Typography variant="body3" className={styles.tableCol}>
                My APY
              </Typography>
              <Typography variant="body3" className={styles.tableCol}>
                My position
              </Typography>
              <Typography variant="body3" className={styles.tableCol}>
                My profit
              </Typography>
            </div>
            <div className={styles.tableBody}>
              {protocols.map((row, rowIndex) => (
                <PortfolioPlatformCard key={String(rowIndex)} row={row} />
              ))}
            </div>
          </Paper>
        )}
      </div>
    </div>
  )
}
