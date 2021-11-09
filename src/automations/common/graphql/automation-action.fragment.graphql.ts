import { gql } from '@urql/core'

export const AUTOMATION_ACTION_FRAGMENT = gql`
  fragment automationActionFragment on AutomateActionType {
    id
    type
    params
    paramsDescription
    priority
    createdAt
  }
`
