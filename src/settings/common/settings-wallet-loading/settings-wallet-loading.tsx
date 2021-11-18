import clsx from 'clsx'

import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { Loader } from '~/common/loader'
import * as styles from './settings-wallet-loading.css'

export type SettingsWalletLoadingProps = {
  className?: string
}

export const SettingsWalletLoading: React.FC<SettingsWalletLoadingProps> = (
  props
) => {
  return (
    <Paper radius={8} className={clsx(styles.root, props.className)}>
      <Typography variant="body2">Loading your wallet...</Typography>
      <Loader className={styles.icon} />
    </Paper>
  )
}
