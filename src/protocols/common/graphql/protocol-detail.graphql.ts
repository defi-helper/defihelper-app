import { gql } from 'urql'

import { PROTOCOL_FRAGMENT } from './protocol.fragment.graphql'

export const PROTOCOL_DETAIL = gql`
  query Protocol($filter: ProtocolFilterInputType!, $hidden: Boolean) {
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
        myStakedChange {
          day
        }
        myEarnedChange {
          day
        }
      }
      contractsDebank(
        filter: { hidden: $hidden }
        pagination: { limit: 1000, offset: 0 }
      ) {
        list {
          id
        }
      }
      contracts(
        filter: { hidden: $hidden }
        pagination: { limit: 1000, offset: 0 }
      ) {
        list {
          id
        }
      }
    }
  }
  ${PROTOCOL_FRAGMENT}
`
