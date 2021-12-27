import { gql } from 'urql'

import { PROTOCOL_FRAGMENT } from './protocol.fragment.graphql'

export const PROTOCOL_UPDATE = gql`
  mutation ProtocolUpdate($id: UuidType!, $input: ProtocolUpdateInputType!) {
    protocolUpdate(id: $id, input: $input) {
      ...protocolFragment
    }
  }
  ${PROTOCOL_FRAGMENT}
`
