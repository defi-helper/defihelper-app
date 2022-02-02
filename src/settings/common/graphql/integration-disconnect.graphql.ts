import { gql } from 'urql'

export const INTEGRATION_DISCONNECT = gql`
  mutation IntegrationDisconnect($id: UuidType!) {
    integrationDisconnect(id: $id)
  }
`
