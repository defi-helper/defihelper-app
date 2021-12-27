import { gql } from 'urql'

export const AUTOMATION_CONDITION_DELETE = gql`
  mutation AutomationConditionDelete($id: UuidType!) {
    automateConditionDelete(id: $id)
  }
`
