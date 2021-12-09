import clsx from 'clsx'

import { useGate, useStore } from 'effector-react'
import { ButtonBase } from '~/common/button-base'
import { Dropdown } from '~/common/dropdown'
import { Icon } from '~/common/icon'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import * as styles from './portfolio-assets.css'
import * as portfolioAssetsModel from '~/portfolio/portfolio-assets/portfolio-assets.model'
import { bignumberUtils } from '~/common/bignumber-utils'

export type PortfolioAssetsProps = {
  className?: string
}

export const PortfolioAssets: React.VFC<PortfolioAssetsProps> = (props) => {
  const assets = useStore(portfolioAssetsModel.$assets)
  useGate(portfolioAssetsModel.PortfolioAssetsGate)

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
          <div className={clsx(styles.tableHeader, styles.tableRow)}>
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
            {assets.map((row, rowIndex) => (
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
                  {row.name}
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
