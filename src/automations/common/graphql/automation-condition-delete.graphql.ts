import { gql } from '@urql/core'

export const AUTOMATION_CONDITION_DELETE = gql`
  mutation AutomationConditionDelete($id: UuidType!) {
    automateConditionDelete(id: $id)
  }
`
