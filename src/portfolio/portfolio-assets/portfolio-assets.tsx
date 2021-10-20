import clsx from 'clsx'

import { ButtonBase } from '~/common/button-base'
import { Dropdown } from '~/common/dropdown'
import { Icon } from '~/common/icon'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import * as styles from './portfolio-assets.css'

export type PortfolioAssetsProps = {
  className?: string
}

const DATA = [['-', '-', '-', '-', '-', '-', '-', '-', '-']]

export const PortfolioAssets: React.VFC<PortfolioAssetsProps> = (props) => {
  return (
    <div className={clsx(styles.root, props.className)}>
      <div className={styles.header}>
        <Typography variant="h3" className={styles.title}>
          Assets 32
        </Typography>
        <Typography variant="h3" className={clsx(styles.title, styles.grey)}>
          Platforms 5
        </Typography>
      </div>
      <Paper radius={8} className={styles.table}>
        <div className={clsx(styles.tableHeader, styles.tableRow)}>
          <Typography variant="body3" className={styles.tableCol}>
            %
          </Typography>
          <Typography variant="body3" className={styles.tableCol}>
            Asset
          </Typography>
          <Typography variant="body3" className={styles.tableCol}>
            Platform
          </Typography>
          <Typography variant="body3" className={styles.tableCol}>
            Chain
          </Typography>
          <Typography variant="body3" className={styles.tableCol}>
            Price
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
          <Typography variant="body3" className={styles.tableCol}>
            Value 24h
          </Typography>
          <Typography variant="body3" className={styles.tableCol}>
            Value 7d
          </Typography>
        </div>
        <div className={styles.tableBody}>
          {DATA.map((row, rowIndex) => (
            <div key={String(rowIndex)} className={styles.tableRow}>
              {row.map((col, colIndex) => (
                <Typography
                  variant="body2"
                  key={String(colIndex)}
                  className={clsx({
                    [styles.negative]: col.includes('-'),
                    [styles.positive]: col.includes('+'),
                  })}
                >
                  {col === 'BAG' && (
                    <>
                      <Icon icon="BAG" className={styles.assetIcon} />{' '}
                    </>
                  )}
                  {col}
                </Typography>
              ))}
            </div>
          ))}
        </div>
      </Paper>
    </div>
  )
}
