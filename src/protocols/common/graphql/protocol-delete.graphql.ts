import { gql } from 'urql'

export const PROTOCOL_DELETE = gql`
  mutation ProtocolDelete($id: UuidType!) {
    protocolDelete(id: $id)
  }
`
