import { gql } from '@urql/core'

export const USER_NOTIFICATION_TOGGLE = gql`
  mutation UserNotificationToggle(
    $type: UserNotificationTypeEnum!
    $state: Boolean!
  ) {
    userNotificationToggle(type: $type, state: $state)
  }
`
