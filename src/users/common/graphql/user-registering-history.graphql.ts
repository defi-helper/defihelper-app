import { gql } from 'urql'

export const USER_REGISTERING_HISTORY = gql`
  query monitoringUsersRegisteringHistory {
    monitoringUsersRegisteringHistory {
      date
      number
    }
  }
`
