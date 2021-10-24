import clsx from 'clsx'

import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { ReactComponent as LoaderIcon } from '~/assets/icons/loader.svg'
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
      <LoaderIcon className={styles.icon} />
    </Paper>
  )
}
