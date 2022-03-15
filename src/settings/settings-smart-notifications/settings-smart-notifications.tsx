import { useGate, useStore } from 'effector-react'

import { Typography } from '~/common/typography'
import {
  SettingsHeader,
  SettingsPaper,
  SettingsGrid,
  SettingsContactFormDialog,
  SettingsSuccessDialog,
} from '~/settings/common'
import { SettingsNotificationsCard } from '~/settings/common/settings-notifications-card'
import { Paper } from '~/common/paper'
import { Loader } from '~/common/loader'
import { UserNotificationTypeEnum } from '~/graphql/_generated-types'
import { useDialog } from '~/common/dialog'
import * as settingsContact from '~/settings/settings-contacts/settings-contact.model'
import * as styles from './settings-smart-notifications.css'
import * as model from './settings-smart-notifications.model'

export type SettingsContactsProps = {
  className?: string
}

export const SettingsSmartNotifications: React.VFC<SettingsContactsProps> = (
  props
) => {
  const loading = useStore(model.fetchUserNotificationsListFx.pending)
  const notificationsList = useStore(model.$userNotificationsList)

  const [openContactForm] = useDialog(SettingsContactFormDialog)
  const [openSuccess] = useDialog(SettingsSuccessDialog)

  const contacts = useStore(settingsContact.$userContactList)

  useGate(model.SettingsNotificationsGate)

  const handleSwitchNotification = async (
    type: UserNotificationTypeEnum,
    state: boolean
  ) => {
    if (
      type === UserNotificationTypeEnum.PortfolioMetrics &&
      !contacts.length &&
      state
    ) {
      const result = await openContactForm()

      const data = await settingsContact.createUserContactFx(result)

      await openSuccess({
        type: result.broker,
        confirmationCode: data.confirmationCode,
      }).catch((error: Error) => console.error(error.message))
    }

    try {
      await model.toggleUserNotificationFx({ type, state })
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  return (
    <div className={props.className}>
      <SettingsHeader className={styles.header}>
        <Typography variant="h3">Smart Notifications</Typography>
      </SettingsHeader>
      <SettingsGrid>
        {loading && (
          <Paper radius={8} className={styles.loader}>
            <Loader height="36" />
          </Paper>
        )}

        {!loading && (
          <SettingsNotificationsCard
            title="Portfolio Status"
            description={
              <>
                Get daily notifications on your portfolio valuation and earnings
              </>
            }
            onSwitch={(state) =>
              handleSwitchNotification(
                UserNotificationTypeEnum.PortfolioMetrics,
                state
              )
            }
            enabled={notificationsList.some(
              (n) => n.type === UserNotificationTypeEnum.PortfolioMetrics
            )}
          />
        )}

        {!loading && (
          <SettingsNotificationsCard
            title="Account Balance Status"
            description={
              <>
                Get notified about balance insufficiency to pay for automated
                transactions
              </>
            }
            onSwitch={(state) =>
              handleSwitchNotification(
                UserNotificationTypeEnum.AutomateCallNotEnoughFunds,
                state
              )
            }
            enabled={notificationsList.some(
              (n) =>
                n.type === UserNotificationTypeEnum.AutomateCallNotEnoughFunds
            )}
          />
        )}

        {!loading && <SettingsPaper key={2} />}
      </SettingsGrid>
    </div>
  )
}
