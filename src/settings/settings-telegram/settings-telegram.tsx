import { useStore } from 'effector-react'
import { useMemo } from 'react'

import { Button } from '~/common/button'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { UserContactBrokerEnum } from '~/api/_generated-types'
import { useDialog } from '~/common/dialog'
import notification from '~/assets/images/notification.png'
import * as authModel from '~/auth/auth.model'
import * as settingsContacts from '~/settings/settings-contacts/settings-contact.model'
import { SettingsConversationDialog } from '~/settings/common'
import * as styles from './settings-telegram.css'
import * as model from './settings-telegram.model'

export type SettingsTelegramProps = unknown

export const SettingsTelegram: React.VFC<SettingsTelegramProps> = () => {
  const userContact = useStore(model.$userContact)
  const userContacts = useStore(settingsContacts.$userContactList)
  const loading = useStore(settingsContacts.fetchUserContactListFx.pending)
  const userReady = useStore(authModel.$userReady)
  const [openSettingsConversationDialog] = useDialog(SettingsConversationDialog)

  const contacts = useMemo(
    () => (userContact ? [...userContacts, userContact] : userContacts),
    [userContact, userContacts]
  )

  const telegram = contacts.find(
    ({ broker }) => broker === UserContactBrokerEnum.Telegram
  )

  if (telegram?.address || loading || !userReady) return <></>

  const handleOpenTelegram = () => {
    openSettingsConversationDialog().catch(console.error)
    model.openTelegram(undefined)
  }

  return (
    <Paper radius={4} className={styles.root}>
      <img alt="" src={notification} className={styles.notification} />
      <Typography variant="body3" as="div" className={styles.text}>
        We will stop to track your portfolio in 30 days if you will not connect
        your telegram account.
      </Typography>
      <div className={styles.buttons}>
        <Button
          size="small"
          color="primary"
          variant="contained"
          className={styles.button}
          onClick={handleOpenTelegram}
        >
          Connect telegram
        </Button>
      </div>
    </Paper>
  )
}
