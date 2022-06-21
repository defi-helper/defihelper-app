import { useGate, useStore } from 'effector-react'

import { Typography } from '~/common/typography'
import {
  SettingsHeader,
  SettingsPaper,
  SettingsGrid,
  SettingsSuccessDialog,
} from '~/settings/common'
import { SettingsNotificationsCard } from '~/settings/common/settings-notifications-card'
import { Paper } from '~/common/paper'
import { Loader } from '~/common/loader'
import {
  UserContactBrokerEnum,
  UserNotificationTypeEnum,
} from '~/api/_generated-types'
import { useDialog } from '~/common/dialog'
import * as settingsContact from '~/settings/settings-contacts/settings-contact.model'
import * as styles from './settings-smart-notifications.css'
import * as model from './settings-smart-notifications.model'
import { analytics } from '~/analytics'

export type SettingsContactsProps = {
  className?: string
}

export const SettingsSmartNotifications: React.VFC<SettingsContactsProps> = (
  props
) => {
  const loading = useStore(model.fetchUserNotificationsListFx.pending)
  const notificationsList = useStore(model.$userNotificationsList)

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
      const data = await settingsContact.createUserContactFx({
        broker: UserContactBrokerEnum.Telegram,
        name: 'telegram',
        address: '',
      })

      await openSuccess({
        type: UserContactBrokerEnum.Telegram,
        confirmationCode: data.confirmationCode,
      }).catch((error: Error) => console.error(error.message))
    }

    try {
      if (!contacts.length) return
      await model.toggleUserNotificationFx({
        type,
        state,
        hour: 12,
        contact: contacts[0].id,
      })
      analytics.onNotificationsEnabled()
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
                Get notified if your balance is too low to pay for automations
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
