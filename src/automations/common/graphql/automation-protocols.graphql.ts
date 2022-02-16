import { gql } from 'urql'

export const AUTOMATION_PROTOCOLS = gql`
  query AutomationProtocols(
    $filter: ProtocolListFilterInputType
    $pagination: ProtocolListPaginationInputType = { limit: 100, offset: 0 }
    $contractPagination: ContractListPaginationInputType = {
      limit: 100
      offset: 0
    }
  ) {
    protocols(filter: $filter, pagination: $pagination) {
      list {
        id
        name
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
