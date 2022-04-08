import { gql } from 'urql'

import { PROTOCOL_FRAGMENT } from './protocol.fragment.graphql'

export const PROTOCOL_DETAIL = gql`
  query Protocol($filter: ProtocolFilterInputType!) {
    protocol(filter: $filter) {
      ...protocolFragment
      previewPicture
      metric {
        tvl
        myAPY
        myStaked
        myEarned
        myMinUpdatedAt
        myAPYBoost
      }
    }
  }
  ${PROTOCOL_FRAGMENT}
`
