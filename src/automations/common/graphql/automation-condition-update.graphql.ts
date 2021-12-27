import { gql } from 'urql'

import { AUTOMATION_CONDITION_FRAGMENT } from './automation-condition.fragment.graphql'

export const AUTOMATION_CONDITION_UPDATE = gql`
  mutation AutomationConditionUpdate(
    $input: AutomateConditionUpdateInputType!
  ) {
    automateConditionUpdate(input: $input) {
      ...automationConditionFragment
    }
  }
  ${AUTOMATION_CONDITION_FRAGMENT}
`
