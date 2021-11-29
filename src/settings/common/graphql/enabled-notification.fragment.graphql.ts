import { gql } from '@urql/core'

export const ENABLED_NOTIFICATION_FRAGMENT = gql`
  fragment userEnabledNotificationType on UserNotificationType {
    type
  }
`
