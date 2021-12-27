import { gql } from 'urql'

import { AUTOMATION_TRIGGER_FRAGMENT } from './automation-trigger.fragment.graphql'

export const AUTOMATION_TRIGGERS = gql`
  query AutomationTriggers(
    $filter: AutomateTriggerListFilterInputType
    $sort: [AutomateTriggerListSortInputType!]
    $pagination: AutomateTriggerListPaginationInputType
    $conditionsFilter: AutomateConditionListFilterInputType
    $conditionsSort: [AutomateConditionListSortInputType!]
    $conditionsPagination: AutomateConditionListPaginationInputType
    $actionsFilter: AutomateActionListFilterInputType
    $actionsSort: [AutomateActionListSortInputType!]
    $actionsPagination: AutomateActionListPaginationInputType
  ) {
    automateTriggers(filter: $filter, sort: $sort, pagination: $pagination) {
      list {
        ...automationTriggerFragment
      }
      pagination {
        count
      }
    }
  }
  ${AUTOMATION_TRIGGER_FRAGMENT}
`
