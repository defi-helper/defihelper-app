import { gql } from '@urql/core'
import { ENABLED_NOTIFICATION_FRAGMENT } from './enabled-notification.fragment.graphql'

export const USER_ENABLED_NOTIFICATIONS = gql`
  query UserNotificationsEnabled {
    userNotificationsEnabled {
      ...userEnabledNotificationType
    }
  }
  ${ENABLED_NOTIFICATION_FRAGMENT}
`
