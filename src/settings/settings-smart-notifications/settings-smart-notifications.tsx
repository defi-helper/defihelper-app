import { useGate, useStore } from 'effector-react'

import { Typography } from '~/common/typography'
import { SettingsHeader, SettingsPaper, SettingsGrid } from '~/settings/common'
import { SettingsNotificationsCard } from '~/settings/common/settings-notifications-card/settings-notifications-card'
import { Paper } from '~/common/paper'
import { Loader } from '~/common/loader'
import { UserNotificationTypeEnum } from '~/graphql/_generated-types'
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

  useGate(model.SettingsNotificationsGate)

  const handleSwitchNotification = async (
    type: UserNotificationTypeEnum,
    state: boolean
  ) => {
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
            title="Portfolio statistics"
            description={
              <>
                We will send you your portfolio value and how much you have
                earned every day
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
            title="Unable to execute automations"
            description={
              <>
                We will send you an alert when you don&apos;t have enough money
                to pay the blockchain and service fee to complete the automation
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
