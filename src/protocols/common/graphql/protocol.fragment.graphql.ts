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
    favorite
    metric {
      tvl
      myAPY
      myStaked
      myEarned
      myMinUpdatedAt
    }
    links {
      social {
        id
        name
        value
      }
      listing {
        id
        name
        value
      }
      audit {
        id
        name
        value
      }
      other {
        id
        name
        value
      }
    }
  }
`
