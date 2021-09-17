import { gql } from '@urql/core'

export const AUTOMATION_CONTRACT_DELETE = gql`
  mutation AutomationContractDelete($id: UuidType!) {
    automateContractDelete(id: $id)
  }
`
