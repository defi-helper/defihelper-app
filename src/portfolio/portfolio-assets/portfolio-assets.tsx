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
import { bignumberUtils } from '~/common/bignumber-utils'
import { settingsWalletModel } from '~/settings/settings-wallets'

export type PortfolioAssetsProps = {
  className?: string
}

export const PortfolioAssets: React.VFC<PortfolioAssetsProps> = (props) => {
  const assets = useStore(portfolioAssetsModel.$assets)
  const assetsByWallet = useStore(portfolioAssetsModel.$assetsByWallet)

  const [currentWallet, setWallet] = useState('')

  const handleSetWallet = (wallet: string) => () => {
    setWallet(wallet)
  }

  const wallets = useStore(settingsWalletModel.$wallets)

  useGate(portfolioAssetsModel.PortfolioAssetsGate, currentWallet)
  // todo introduce pagination and server-side asset percentage calculation

  return (
    <div className={clsx(styles.root, props.className)}>
      <div className={styles.header}>
        <Typography variant="h3" className={styles.title}>
          Assets {assets.length}
        </Typography>
        <Typography
          variant="h3"
          className={clsx(styles.title, styles.grey)}
          style={{ display: 'none' }}
        >
          Platforms 5
        </Typography>
      </div>
      <div className={styles.tableWrap}>
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
          <div className={clsx(styles.tableHeadings, styles.tableRow)}>
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
                  — Calculated value based on your amount of asset and its price
                </Typography>
                <Typography variant="body3">
                  <Typography variant="inherit" className={styles.blue}>
                    Act
                  </Typography>{' '}
                  — Actual value you can exchange right now based on real market
                  liquidity
                </Typography>
              </Dropdown>
            </Typography>
          </div>
          <div className={styles.tableBody}>
            {(currentWallet ? assetsByWallet : assets).map((row, rowIndex) => (
              <div key={String(rowIndex)} className={styles.tableRow}>
                <Typography variant="body2">
                  {bignumberUtils.format(row.metric.myPortfolioPercent, 2)}%
                </Typography>

                <Typography variant="body2" className={styles.assetName}>
                  {row.logoUrl ? (
                    <img
                      src={row.logoUrl}
                      className={styles.assetLogo}
                      alt={`${row.name} logo`}
                    />
                  ) : (
                    <div className={styles.assetLogoPlaceholder} />
                  )}
                  {row.name} ({row.symbol})
                </Typography>

                <Typography variant="body2">
                  {bignumberUtils.format(row.metric.myBalance)}
                </Typography>
                <Typography variant="body2">
                  ${bignumberUtils.format(row.metric.myUSD)}
                </Typography>
              </div>
            ))}
          </div>
        </Paper>
      </div>
    </div>
  )
}
