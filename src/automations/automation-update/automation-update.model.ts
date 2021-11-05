// @ts-nocheck
import { createDomain, sample } from 'effector-logger/macro'
import { createGate } from 'effector-react'

import {
  AutomateActionCreateInputType,
  AutomateActionUpdateInputType,
  AutomateConditionCreateInputType,
  AutomateConditionUpdateInputType,
  AutomateTriggerUpdateInputType,
} from '~/graphql/_generated-types'
import { automationApi } from '~/automations/common/automation.api'
import { Trigger, Action, Condition } from '../common/automation.types'
import { AutomationTriggerExpressions } from '../common/automation-trigger-expression'

export const automationUpdateDomain = createDomain()

export const updateTriggerFx = automationUpdateDomain.createEffect(
  async (input: AutomateTriggerUpdateInputType) => {
    const data = await automationApi.updateTrigger({ input })

    if (!data) throw new Error('not updated')

    return data
  }
)

export const createActionFx = automationUpdateDomain.createEffect(
  async (input: AutomateActionCreateInputType) => {
    const data = await automationApi.createAction({ input })

    if (!data) throw new Error('not created')

    return data
  }
)

export const deleteActionFx = automationUpdateDomain.createEffect(
  async (actionId: string) => {
    return automationApi.deleteAction({ id: actionId })
  }
)

export const updateActionFx = automationUpdateDomain.createEffect(
  async (input: AutomateActionUpdateInputType) => {
    const data = await automationApi.updateAction({ input })

    if (!data) throw new Error('not updated')

    return data
  }
)

export const createConditionFx = automationUpdateDomain.createEffect(
  async (input: AutomateConditionCreateInputType) => {
    const data = await automationApi.createCondition({ input })

    if (!data) throw new Error('not created')

    return data
  }
)

export const deleteConditonFx = automationUpdateDomain.createEffect(
  async (conditionId: string) => {
    return automationApi.deleteCondition({ id: conditionId })
  }
)

export const updateConditionFx = automationUpdateDomain.createEffect(
  async (input: AutomateConditionUpdateInputType) => {
    const data = await automationApi.updateCondition({ input })

    if (!data) throw new Error('not updated')

    return data
  }
)

export const setExpressions = automationUpdateDomain.createEvent<{
  conditions: Condition[] | undefined
  actions: Action[] | undefined
}>()

export const $actions = automationUpdateDomain
  .createStore<Action[]>([])
  .on(setExpressions, (_, payload) => payload.actions)
  .on(createActionFx.doneData, (state, payload) => [
    ...state,
    { ...payload, kind: 'action' },
  ])
  .on(updateActionFx.doneData, (state, payload) =>
    state.map((action) =>
      action.id === payload.id ? { ...payload, kind: 'action' } : action
    )
  )
  .on(deleteActionFx.done, (state, { params }) =>
    state.filter((action) => action.id !== params)
  )

const createNumberArray = (num: number) =>
  Array.from(Array(num), (_, index) => index)

export const setAction = automationUpdateDomain.createEvent<number>()

export const $actionsCount = $actions
  .map((actions) => createNumberArray(actions.length))
  .on(setAction, (_, payload) => createNumberArray(payload))

export const $conditions = automationUpdateDomain
  .createStore<Condition[]>([])
  .on(setExpressions, (_, payload) => payload.conditions)
  .on(createConditionFx.doneData, (state, payload) => [
    ...state,
    { ...payload, kind: 'condition' },
  ])
  .on(updateConditionFx.doneData, (state, payload) =>
    state.map((condition) =>
      condition.id === payload.id
        ? { ...payload, kind: 'condition' }
        : condition
    )
  )
  .on(deleteConditonFx.done, (state, { params }) =>
    state.filter((condition) => condition.id !== params)
  )

export const setCondition = automationUpdateDomain.createEvent<number>()

export const $conditionsCount = $conditions
  .map((conditions) => createNumberArray(conditions.length))
  .on(setCondition, (_, payload) => createNumberArray(payload))

export const AutomationUpdateGate = createGate<Trigger>({
  domain: automationUpdateDomain,
  name: 'AutomationUpdateGate',
})

sample({
  clock: AutomationUpdateGate.open,
  fn: (trigger: Trigger) => ({
    actions: trigger.actions.list?.map((action) => ({
      ...action,
      kind: AutomationTriggerExpressions.action as 'action',
    })),
    conditions: trigger.conditions.list?.map((condition) => ({
      ...condition,
      kind: AutomationTriggerExpressions.condition as 'condition',
    })),
  }),
  target: setExpressions,
})

$conditions.reset(AutomationUpdateGate.close)
$actions.reset(AutomationUpdateGate.close)
