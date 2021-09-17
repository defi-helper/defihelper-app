import { gql } from '@urql/core'

export const AUTOMATION_ACTION_DELETE = gql`
  mutation AutomationActionDelete($id: UuidType!) {
    automateActionDelete(id: $id)
  }
`
