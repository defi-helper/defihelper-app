import { gql } from 'urql'

import { PROTOCOL_FRAGMENT } from './protocol.fragment.graphql'

export const PROTOCOL_CREATE = gql`
  mutation ProtocolCreate($input: ProtocolCreateInputType!) {
    protocolCreate(input: $input) {
      ...protocolFragment
    }
  }
  ${PROTOCOL_FRAGMENT}
`
