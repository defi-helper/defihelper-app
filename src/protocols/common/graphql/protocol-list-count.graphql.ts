import { gql } from 'urql'

export const PROTOCOL_LIST_COUNT = gql`
  query ProtocolsCount($hidden: Boolean) {
    favorites: protocols(filter: { hidden: $hidden, favorite: true }) {
      pagination {
        count
      }
    }
    all: protocols(filter: { hidden: $hidden }) {
      pagination {
        count
      }
    }
  }
`
