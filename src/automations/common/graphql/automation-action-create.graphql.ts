import { gql } from '@urql/core'

import { AUTOMATION_ACTION_FRAGMENT } from './automation-action.fragment.graphql'

export const AUTOMATION_ACTION_CREATE = gql`
  mutation AutomationActionCreate($input: AutomateActionCreateInputType!) {
    automateActionCreate(input: $input) {
      ...automationActionFragment
    }
  }
  ${AUTOMATION_ACTION_FRAGMENT}
`
