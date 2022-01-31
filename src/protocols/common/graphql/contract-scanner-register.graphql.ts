import { gql } from 'urql'

export const CONTRACT_SCANNER_REGISTER = gql`
  mutation ContractScannerRegister($id: UuidType!, $events: [String!]!) {
    contractScannerRegister(id: $id, events: $events)
  }
`
