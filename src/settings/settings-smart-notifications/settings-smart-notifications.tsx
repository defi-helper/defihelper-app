import { useMedia } from 'react-use'

import { useGate, useStore } from 'effector-react'
import { Typography } from '~/common/typography'
import { Carousel } from '~/common/carousel'
import { SettingsHeader, SettingsPaper } from '~/settings/common'
import * as styles from './settings-smart-notifications.css'
import { SettingsNotificationsCard } from '~/settings/common/settings-notifications-card/settings-notifications-card'
import * as model from './settings-smart-notifications.model'
import { Paper } from '~/common/paper'
import { Loader } from '~/common/loader'
import { UserNotificationTypeEnum } from '~/graphql/_generated-types'

export type SettingsContactsProps = {
  className?: string
}

const Grid: React.FC = (props) => {
  const isDesktop = useMedia('(min-width: 960px)')

  return isDesktop ? (
    <div className={styles.list}>{props.children}</div>
  ) : (
    <Carousel className={styles.carousel}>{props.children}</Carousel>
  )
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
      <Grid>
        {loading && (
          <Paper radius={8} className={styles.loader}>
            <Loader height="36" />
          </Paper>
        )}

        {loading || (
          <>
            <SettingsNotificationsCard
              title="Portfolio statistics"
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

            <SettingsNotificationsCard
              title="Unable to execute automate"
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

            <SettingsPaper key={2} />
          </>
        )}
      </Grid>
    </div>
  )
}
