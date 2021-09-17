import { gql } from '@urql/core'

import { AUTOMATION_TRIGGER_FRAGMENT } from './automation-trigger.fragment.graphql'

export const AUTOMATION_TRIGGER = gql`
  query AutomationTrigger(
    $filter: AutomateTriggerFilterInputType!
    $conditionsFilter: AutomateConditionListFilterInputType
    $conditionsSort: [AutomateConditionListSortInputType!]
    $conditionsPagination: AutomateConditionListPaginationInputType
    $actionsFilter: AutomateActionListFilterInputType
    $actionsSort: [AutomateActionListSortInputType!]
    $actionsPagination: AutomateActionListPaginationInputType
  ) {
    automateTrigger(filter: $filter) {
      ...automationTriggerFragment
    }
  }
  ${AUTOMATION_TRIGGER_FRAGMENT}
`
