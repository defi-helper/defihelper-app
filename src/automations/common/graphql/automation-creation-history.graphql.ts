import { gql } from 'urql'

export const AUTOMATION_CREATION_HISTORY = gql`
  query monitoringAutomationsCreationHistory {
    monitoringAutomatesCreationHistory {
      date
      number
    }
  }
`
