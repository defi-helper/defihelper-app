import { AppLayout } from '~/layouts'
import { Typography } from '~/common/typography'
import { SettingsContacts } from './settings-contacts'
import { SettingsWallets } from './settings-wallets'
import * as styles from './settings.css'

export type SettingsProps = unknown

export const Settings: React.VFC<SettingsProps> = () => {
  return (
    <AppLayout>
      <div className={styles.root}>
        <SettingsContacts className={styles.section} />
        <SettingsWallets className={styles.section} />
        <div className={styles.section}>
          <Typography variant="h3">Transaction History</Typography>
        </div>
      </div>
    </AppLayout>
  )
}
