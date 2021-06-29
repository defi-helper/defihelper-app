import { gql } from '@urql/core'

export const PROTOCOL_FRAGMENT = gql`
  fragment protocolFragment on ProtocolType {
    id
    adapter
    name
    description
    icon
    link
    hidden
    createdAt
  }
`
