import { gql } from 'urql'

export const AUTOMATION_AUTORESTAKE_CREATION_HISTORY = gql`
  query monitoringAutomationsAutorestakeCreationHistory {
    monitoringAutoRestakeAutomatesCreationHistory {
      date
      number
    }
  }
`
