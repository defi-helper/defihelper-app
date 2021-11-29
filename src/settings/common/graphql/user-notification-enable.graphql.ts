import { gql } from '@urql/core'

export const USER_NOTIFICATION_ENABLE = gql`
  mutation UserNotificationEnable($type: UserNotificationTypeEnum!) {
    userNotificationEnable(type: $type)
  }
`
