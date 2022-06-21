import { gql } from 'urql'

export const USER_NOTIFICATION_TOGGLE = gql`
  mutation UserNotificationToggle(
    $contact: UuidType!
    $type: UserNotificationTypeEnum!
    $state: Boolean!
    $hour: Int!
  ) {
    userNotificationToggle(
      contact: $contact
      type: $type
      state: $state
      hour: $hour
    )
  }
`
