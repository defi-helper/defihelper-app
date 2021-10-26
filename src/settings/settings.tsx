import { AppLayout } from '~/layouts'
import { SettingsContacts } from './settings-contacts'
import { SettingsWallets } from './settings-wallets'
import { Head } from '~/common/head'
import { SettingsTransactionHistory } from './settings-transaction-history'
import * as styles from './settings.css'

export type SettingsProps = unknown

export const Settings: React.VFC<SettingsProps> = () => {
  return (
    <AppLayout title="Settings">
      <Head title="Settings" />
      <div className={styles.root}>
        <SettingsContacts className={styles.section} />
        <SettingsWallets className={styles.section} />
        <SettingsTransactionHistory className={styles.section} />
      </div>
    </AppLayout>
  )
}
