import { gql } from '@urql/core'

export const PROTOCOL_DELETE = gql`
  mutation ProtocolDelete($id: UuidType!) {
    protocolDelete(id: $id)
  }
`
