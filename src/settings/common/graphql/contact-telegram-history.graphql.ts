import { gql } from 'urql'

export const CONTACT_TELEGRAM_HISTORY = gql`
  query monitoringTelegramContactsHistory {
    monitoringTelegramContactsHistory {
      date
      number
    }
  }
`
