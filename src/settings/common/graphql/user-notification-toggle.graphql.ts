import { gql } from 'urql'

export const USER_NOTIFICATION_TOGGLE = gql`
  mutation UserNotificationToggle(
    $type: UserNotificationTypeEnum!
    $state: Boolean!
  ) {
    userNotificationToggle(type: $type, state: $state)
  }
`
