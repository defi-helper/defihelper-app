import { gql } from 'urql'

export const PROTOCOL_RESOLVE_CONTRACTS = gql`
  mutation ProtocolResolveContracts(
    $id: UuidType!
    $input: ProtocolResolveContractsInputType!
  ) {
    protocolResolveContracts(id: $id, input: $input)
  }
`
