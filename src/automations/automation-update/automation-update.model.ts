import { createDomain, sample, restore, guard } from 'effector'
import { createGate } from 'effector-react'

import {
  AutomateActionCreateInputType,
  AutomateActionUpdateInputType,
  AutomateConditionCreateInputType,
  AutomateConditionUpdateInputType,
  AutomateTriggerUpdateInputType,
  AutomateTriggerCreateInputType,
  AutomateActionType,
  AutomateConditionType,
} from '~/api/_generated-types'
import { automationApi } from '~/automations/common/automation.api'
import { Trigger } from '../common/automation.types'
import { toastsService } from '~/toasts'
import { authModel } from '~/auth'

export const automationUpdateDomain = createDomain()

export const AutomationUpdateGate = createGate<Trigger | null>({
  domain: automationUpdateDomain,
  name: 'AutomationUpdateGate',
})

export const createTriggerFx = automationUpdateDomain.createEffect(
  async (input: AutomateTriggerCreateInputType) => {
    const data = await automationApi.createTrigger({ input })

    if (!data) throw new Error('not created')

    return data
  }
)

export const updateTriggerFx = automationUpdateDomain.createEffect(
  async (input: AutomateTriggerUpdateInputType) => {
    const data = await automationApi.updateTrigger({ input })

    if (!data) throw new Error('not updated')

    return data
  }
)

export const resolveAbiFx = automationUpdateDomain.createEffect(
  async (input: { address: string; network: string }) => {
    return automationApi.fetchContractAbi(input.network, input.address)
  }
)

export const $createdTrigger = restore(createTriggerFx.doneData, null)
export const $updatedTrigger = restore(updateTriggerFx.doneData, null)

export const createActionFx = automationUpdateDomain.createEffect(
  async (input: AutomateActionCreateInputType) => {
    const data = await automationApi.createAction({ input })

    if (!data) throw new Error('not created')

    return {
      ...data,
      triggerId: input.trigger,
    }
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

    return {
      ...data,
      triggerId: input.trigger,
    }
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

export const fetchProtocolsFx = automationUpdateDomain.createEffect(() =>
  automationApi.getProtocols({
    filter: {
      hidden: false,
      isDebank: false,
    },
  })
)

sample({
  clock: AutomationUpdateGate.open,
  target: fetchProtocolsFx,
})

export const setExpressions = automationUpdateDomain.createEvent<{
  conditions: AutomateConditionType[]
  actions: AutomateActionType[]
}>()

export const $conditions = automationUpdateDomain
  .createStore<AutomateConditionType[]>([])
  .on(setExpressions, (_, payload) => payload.conditions)
  .on(createConditionFx.doneData, (state, payload) => [...state, payload])
  .on(updateConditionFx.doneData, (state, payload) =>
    state.map((condition) =>
      condition.id === payload.id ? payload : condition
    )
  )
  .on(deleteConditonFx.done, (state, { params }) =>
    state.filter((condition) => condition.id !== params)
  )

export const $actions = automationUpdateDomain
  .createStore<AutomateActionType[]>([])
  .on(setExpressions, (_, payload) => payload.actions)
  .on(createActionFx.doneData, (state, payload) => [...state, payload])
  .on(updateActionFx.doneData, (state, payload) =>
    state.map((action) => (action.id === payload.id ? payload : action))
  )
  .on(deleteActionFx.done, (state, { params }) =>
    state.filter((action) => action.id !== params)
  )

sample({
  clock: guard({
    clock: AutomationUpdateGate.open,
    filter: (trigger): trigger is Trigger => Boolean(trigger),
  }),
  fn: (trigger: Trigger) => ({
    actions: trigger.actions.list ?? [],
    conditions: trigger.conditions.list ?? [],
  }),
  target: setExpressions,
})

export const $actionsPriority = restore(
  sample({
    clock: $actions.updates,
    fn: (actions) =>
      actions.sort((actionA, actionB) => actionA.priority - actionB.priority)[
        actions.length - 1
      ]?.priority,
  }),
  0
)

export const $conditionsPriority = restore(
  sample({
    clock: $conditions.updates,
    fn: (conditions) =>
      conditions.sort(
        (conditionA, conditionB) => conditionA.priority - conditionB.priority
      )[conditions.length - 1]?.priority,
  }),
  0
)

$actions.reset(AutomationUpdateGate.close, authModel.logoutFx)
$actionsPriority.reset(AutomationUpdateGate.close, authModel.logoutFx)
$conditions.reset(AutomationUpdateGate.close, authModel.logoutFx)
$conditionsPriority.reset(AutomationUpdateGate.close, authModel.logoutFx)
$createdTrigger.reset(AutomationUpdateGate.close, authModel.logoutFx)
$updatedTrigger.reset(AutomationUpdateGate.close, authModel.logoutFx)

toastsService.forwardErrors(
  createActionFx.failData,
  updateActionFx.failData,
  deleteActionFx.failData,
  createConditionFx.failData,
  updateConditionFx.failData,
  deleteConditonFx.failData,
  fetchProtocolsFx.failData,
  createTriggerFx.failData,
  updateTriggerFx.failData
)
