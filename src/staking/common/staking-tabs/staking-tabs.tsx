import clsx from 'clsx'

import { ButtonBase } from '~/common/button-base'
import { Paper } from '~/common/paper'
import * as styles from './staking-tabs.css'

export type StakingTabsProps = {
  className?: string
}

export const StakingTabs: React.VFC<StakingTabsProps> = (props) => {
  return (
    <Paper className={clsx(styles.root, props.className)}>
      <ButtonBase className={clsx(styles.tab, styles.active)}>All</ButtonBase>
      <ButtonBase className={styles.tab}>Invested</ButtonBase>
    </Paper>
  )
}
