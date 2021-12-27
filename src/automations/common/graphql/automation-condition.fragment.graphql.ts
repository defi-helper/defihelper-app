import { gql } from 'urql'

export const AUTOMATION_CONDITION_FRAGMENT = gql`
  fragment automationConditionFragment on AutomateConditionType {
    id
    type
    params
    paramsDescription
    priority
    createdAt
  }
`
