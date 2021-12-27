import { gql } from 'urql'

import { AUTOMATION_TRIGGER_FRAGMENT } from './automation-trigger.fragment.graphql'

export const AUTOMATION_TRIGGER_CREATE = gql`
  mutation AutomationTriggerCreate(
    $input: AutomateTriggerCreateInputType!
    $conditionsFilter: AutomateConditionListFilterInputType
    $conditionsSort: [AutomateConditionListSortInputType!]
    $conditionsPagination: AutomateConditionListPaginationInputType
    $actionsFilter: AutomateActionListFilterInputType
    $actionsSort: [AutomateActionListSortInputType!]
    $actionsPagination: AutomateActionListPaginationInputType
  ) {
    automateTriggerCreate(input: $input) {
      ...automationTriggerFragment
    }
  }
  ${AUTOMATION_TRIGGER_FRAGMENT}
`
