import { gql } from '@urql/core'

export const AUTOMATION_TRIGGER_DELETE = gql`
  mutation AutomationTriggerDelete($id: UuidType!) {
    automateTriggerDelete(id: $id)
  }
`
