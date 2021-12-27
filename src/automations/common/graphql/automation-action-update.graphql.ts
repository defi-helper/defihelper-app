import { gql } from 'urql'

import { AUTOMATION_ACTION_FRAGMENT } from './automation-action.fragment.graphql'

export const AUTOMATION_ACTION_UPDATE = gql`
  mutation AutomationActionUpdate($input: AutomateActionUpdateInputType!) {
    automateActionUpdate(input: $input) {
      ...automationActionFragment
    }
  }
  ${AUTOMATION_ACTION_FRAGMENT}
`
