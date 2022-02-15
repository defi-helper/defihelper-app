import { gql } from 'urql'

import { AUTOMATION_CONDITION_FRAGMENT } from './automation-condition.fragment.graphql'
import { AUTOMATION_ACTION_FRAGMENT } from './automation-action.fragment.graphql'

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
      name
    }
    params
    name
    active
    lastCallAt
    restakeAt
    createdAt
    conditions(
      filter: $conditionsFilter
      sort: $conditionsSort
      pagination: $conditionsPagination
    ) {
      list {
        ...automationConditionFragment
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
        ...automationActionFragment
      }
      pagination {
        count
      }
    }
  }
  ${AUTOMATION_CONDITION_FRAGMENT}
  ${AUTOMATION_ACTION_FRAGMENT}
`
