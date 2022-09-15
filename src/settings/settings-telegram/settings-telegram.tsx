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
import { dateUtils } from '~/common/date-utils'
import { pluralize } from '~/common/pluralize'

export type SettingsTelegramProps = unknown

export const SettingsTelegram: React.VFC<SettingsTelegramProps> = () => {
  const userContact = useStore(model.$userContact)
  const userContacts = useStore(settingsContacts.$userContactList)
  const user = useStore(authModel.$user)
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

  const leftDays = dateUtils.leftDays(user?.portfolioCollectingFreezedAt)

  return (
    <Paper radius={4} className={styles.root}>
      <img alt="" src={notification} className={styles.notification} />
      <Typography variant="body3" as="div" className={styles.text}>
        {leftDays > 0 ? (
          <>
            We will stop to track your portfolio in {leftDays}{' '}
            {pluralize(leftDays, 'day')} if you will not connect your telegram
            account.
          </>
        ) : (
          <>
            Tracking of your portfolio has been stopped because you have not
            connected telegram.
          </>
        )}
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
