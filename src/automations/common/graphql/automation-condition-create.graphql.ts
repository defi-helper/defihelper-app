import { gql } from 'urql'

import { AUTOMATION_CONDITION_FRAGMENT } from './automation-condition.fragment.graphql'

export const AUTOMATION_CONDITION_CREATE = gql`
  mutation AutomationConditionCreate(
    $input: AutomateConditionCreateInputType!
  ) {
    automateConditionCreate(input: $input) {
      ...automationConditionFragment
    }
  }
  ${AUTOMATION_CONDITION_FRAGMENT}
`
