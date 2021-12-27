import { gql } from 'urql'

export const AUTOMATION_CONTRACT_DELETE = gql`
  mutation AutomationContractDelete($id: UuidType!) {
    automateContractDelete(id: $id)
  }
`
