import { gql } from '@urql/core'
import { NOTIFICATION_FRAGMENT } from './user-notification.fragment.graphql'

export const USER_NOTIFICATION_LIST = gql`
  query UserNotificationsList {
    userNotifications {
      ...userNotificationType
    }
  }
  ${NOTIFICATION_FRAGMENT}
`
