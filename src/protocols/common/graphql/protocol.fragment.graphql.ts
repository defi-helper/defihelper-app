import { gql } from 'urql'

export const PROTOCOL_FRAGMENT = gql`
  fragment protocolFragment on ProtocolType {
    id
    adapter
    name
    description
    debankId
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
      myAPYBoost
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
