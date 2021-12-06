import { gql } from '@urql/core'

export const NOTIFICATION_FRAGMENT = gql`
  fragment userNotificationType on UserNotificationType {
    type
  }
`
