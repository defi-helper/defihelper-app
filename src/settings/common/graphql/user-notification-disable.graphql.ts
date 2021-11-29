import { gql } from '@urql/core'

export const USER_NOTIFICATION_DISABLE = gql`
  mutation UserNotificationDisable($type: UserNotificationTypeEnum!) {
    userNotificationDisable(type: $type)
  }
`
