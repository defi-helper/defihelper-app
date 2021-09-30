import { gql } from '@urql/core'

export const AUTOMATION_TRIGGER_FRAGMENT = gql`
  fragment automationTriggerFragment on AutomateTriggerType {
    id
    type
    wallet {
      id
      blockchain
      network
      address
      publicKey
      createdAt
    }
    params
    name
    active
    lastCallAt
    createdAt
    conditions(
      filter: $conditionsFilter
      sort: $conditionsSort
      pagination: $conditionsPagination
    ) {
      list {
        id
        type
        params
        priority
        createdAt
      }
      pagination {
        count
      }
    }
    actions(
      filter: $actionsFilter
      sort: $actionsSort
      pagination: $actionsPagination
    ) {
      list {
        id
        type
        params
        priority
        createdAt
      }
      pagination {
        count
      }
    }
  }
`
