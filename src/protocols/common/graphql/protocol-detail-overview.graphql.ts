import { gql } from 'urql'

export const PROTOCOL_DETAIL_OVERVIEW = gql`
  query ProtocolOverview($filter: ProtocolFilterInputType!) {
    protocol(filter: $filter) {
      description
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
  }
`
