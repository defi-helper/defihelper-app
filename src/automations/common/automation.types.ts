import {
  AutomationTriggerFragmentFragment,
  AutomateConditionType,
  AutomateActionType,
} from '~/graphql/_generated-types'

export type Trigger = AutomationTriggerFragmentFragment & { deleting?: boolean }

export type Condition = AutomateConditionType & {
  kind: 'condition'
}

export type Action = AutomateActionType & {
  kind: 'action'
}

export const isAction = (
  conditioinOrAction?: Condition | Action
): conditioinOrAction is Action => {
  return (
    conditioinOrAction !== undefined && conditioinOrAction.kind === 'action'
  )
}

export const isCondition = (
  conditioinOrAction?: Condition | Action
): conditioinOrAction is Condition => {
  return (
    conditioinOrAction !== undefined && conditioinOrAction.kind === 'condition'
  )
}
