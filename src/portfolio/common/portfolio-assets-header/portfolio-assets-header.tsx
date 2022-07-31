import clsx from 'clsx'

import { ButtonBase } from '~/common/button-base'
import { Dropdown } from '~/common/dropdown'
import { Icon } from '~/common/icon'
import { Typography } from '~/common/typography'
import * as styles from './portfolio-assets-header.css'

export type PortfolioAssetsHeaderProps = {
  className?: string
}

export const PortfolioAssetsHeader: React.VFC<PortfolioAssetsHeaderProps> = (
  props
) => {
  return (
    <div className={clsx(styles.headings, styles.root, props.className)}>
      <Typography variant="body3">%</Typography>
      <Typography variant="body3">Asset</Typography>
      <Typography variant="body3" align="right">
        Price
      </Typography>
      <Typography variant="body3" align="right">
        Balance
      </Typography>
      <Typography variant="body3" align="right">
        Value{' '}
        {false && (
          <>
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
          </>
        )}
      </Typography>

      <Typography variant="body3" align="right">
        Value 24h
      </Typography>

      <Typography variant="body3" align="right">
        Value 7d
      </Typography>
    </div>
  )
}
