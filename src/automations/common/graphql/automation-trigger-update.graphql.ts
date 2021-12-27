import { gql } from 'urql'

import { AUTOMATION_TRIGGER_FRAGMENT } from './automation-trigger.fragment.graphql'

export const AUTOMATION_TRIGGER_UPDATE = gql`
  mutation AutomationTriggerUpdate(
    $input: AutomateTriggerUpdateInputType!
    $conditionsFilter: AutomateConditionListFilterInputType
    $conditionsSort: [AutomateConditionListSortInputType!]
    $conditionsPagination: AutomateConditionListPaginationInputType
    $actionsFilter: AutomateActionListFilterInputType
    $actionsSort: [AutomateActionListSortInputType!]
    $actionsPagination: AutomateActionListPaginationInputType
  ) {
    automateTriggerUpdate(input: $input) {
      ...automationTriggerFragment
    }
  }
  ${AUTOMATION_TRIGGER_FRAGMENT}
`
