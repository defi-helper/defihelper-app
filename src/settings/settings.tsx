import { AppLayout } from '~/layouts'
import { SettingsContacts } from './settings-contacts'
import { SettingsSmartNotifications } from './settings-smart-notifications'
import { SettingsWallets } from './settings-wallets'
import { Head } from '~/common/head'
import { SettingsTransactionHistory } from './settings-transaction-history'
import { StakingAutomates } from '~/staking/staking-automates'
import * as styles from './settings.css'
import { SettingsIntegrations } from '~/settings/settings-integrations'

export type SettingsProps = unknown

export const Settings: React.VFC<SettingsProps> = () => {
  return (
    <AppLayout title="Settings">
      <Head title="Settings" />
      <div className={styles.root}>
        <SettingsWallets className={styles.section} />
        <SettingsContacts className={styles.section} />
        <SettingsSmartNotifications className={styles.section} />
        <SettingsTransactionHistory className={styles.section} />
        <SettingsIntegrations className={styles.section} />
        <StakingAutomates className={styles.section} />
      </div>
    </AppLayout>
  )
}
