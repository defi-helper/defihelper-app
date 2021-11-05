import { gql } from '@urql/core'

export const AUTOMATION_PROTOCOLS = gql`
  query AutomationProtocols(
    $pagination: ProtocolListPaginationInputType = { limit: 100, offset: 0 }
    $contractPagination: ContractListPaginationInputType = {
      limit: 100
      offset: 0
    }
  ) {
    protocols(pagination: $pagination) {
      list {
        name
        id
        icon
        contracts(pagination: $contractPagination) {
          list {
            id
            blockchain
            network
            address
            name
            events
          }
        }
      }
    }
  }
`
