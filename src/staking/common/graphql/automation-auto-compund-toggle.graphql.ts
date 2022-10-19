import { gql } from 'urql'

export const AUTOMATION_AUTO_COMPOUND_TOGGLE = gql`
  mutation AutomationAutoCompoundToggle(
    $id: UuidType!
    $input: AutomateContractTriggerUpdateInputType!
  ) {
    automateContractTriggerUpdate(id: $id, input: $input) {
      id
      active
    }
  }
`
