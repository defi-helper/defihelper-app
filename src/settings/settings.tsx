import { AppLayout } from '~/layouts'
import { SettingsContacts } from './settings-contacts'
import { SettingsSmartNotifications } from './settings-smart-notifications'
import { SettingsWallets } from './settings-wallets'
import { Head } from '~/common/head'
import { SettingsTransactionHistory } from './settings-transaction-history'
import { StakingAutomates } from '~/staking/staking-automates'
import { SettingsIntegrations } from '~/settings/settings-integrations'
import { Typography } from '~/common/typography'
import { Button } from '~/common/button'
import { authModel } from '~/auth'
import * as styles from './settings.css'

export type SettingsProps = unknown

export const Settings: React.VFC<SettingsProps> = () => {
  const handleLogout = () => {
    authModel.logoutFx()
  }

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
        <div className={styles.section}>
          <Typography variant="h3" className={styles.title}>
            Account
          </Typography>
          <Button color="red" size="medium" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </div>
    </AppLayout>
  )
}
