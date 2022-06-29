import { gql } from 'urql'

export const NOTIFICATION_FRAGMENT = gql`
  fragment userNotificationType on UserNotificationType {
    type
    time
    contact
  }
`
