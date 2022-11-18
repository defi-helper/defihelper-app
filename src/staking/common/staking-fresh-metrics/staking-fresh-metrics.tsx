import clsx from 'clsx'

import { ButtonBase } from '~/common/button-base'
import { Dropdown } from '~/common/dropdown'
import { Icon } from '~/common/icon'
import { Typography } from '~/common/typography'
import * as styles from './staking-fresh-metrics.css'

export type StakingFreshMetricsProps = {
  className?: string
}

export const StakingFreshMetrics: React.VFC<StakingFreshMetricsProps> = (
  props
) => {
  return (
    <Dropdown
      control={
        <ButtonBase className={clsx(styles.freshMetricsIcon, props.className)}>
          <Icon icon="light" height="1em" width="1em" />
        </ButtonBase>
      }
      trigger="hover"
      placement="top-start"
      className={styles.freshMetricsDropdown}
      offset={[0, 13]}
    >
      <Typography variant="body2" className={styles.freshMetricsTitle}>
        DFH Live stat <Icon icon="light" />
      </Typography>
      <Typography variant="body2">
        With your Metamask wallet connected we can provide contract statistics
        every 15 seconds.
      </Typography>
    </Dropdown>
  )
}
