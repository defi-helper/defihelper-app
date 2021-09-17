import { gql } from '@urql/core'

export const AUTOMATION_CONDITION_FRAGMENT = gql`
  fragment automationConditionFragment on AutomateConditionType {
    id
    type
    params
    priority
    createdAt
  }
`
