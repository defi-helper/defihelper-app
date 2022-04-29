import { gql } from 'urql'

export const AUTOMATION_CREATION_HISTORY = gql`
  query automationsCreationHistory {
    automatesCreationHistory {
      date
      number
    }
  }
`
