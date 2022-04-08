import { gql } from 'urql'

export const PROTOCOL_FRAGMENT = gql`
  fragment protocolFragment on ProtocolType {
    id
    adapter
    name
    debankId
    icon
    link
    hidden
    createdAt
    favorite
  }
`
