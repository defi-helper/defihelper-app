import { createDomain, sample, restore } from 'effector-logger/macro'
import { createGate } from 'effector-react'

import {
  AutomateActionCreateInputType,
  AutomateActionUpdateInputType,
  AutomateConditionCreateInputType,
  AutomateConditionUpdateInputType,
  AutomateTriggerUpdateInputType,
  AutomateTriggerCreateInputType,
} from '~/graphql/_generated-types'
import { automationApi } from '~/automations/common/automation.api'
import { Trigger, Protocol } from '../common/automation.types'

export const automationUpdateDomain = createDomain()

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

export const $createdTrigger = restore(createTriggerFx.doneData, null)
export const $updatedTrigger = restore(updateTriggerFx.doneData, null)

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

export const fetchProtocolsFx = automationUpdateDomain.createEffect(() =>
  automationApi.getProtocols({})
)

export const $protocols = automationUpdateDomain
  .createStore<Protocol[]>([])
  .on(fetchProtocolsFx.doneData, (_, payload) => payload)

export const AutomationUpdateGate = createGate<Trigger>({
  domain: automationUpdateDomain,
  name: 'AutomationUpdateGate',
})

sample({
  clock: AutomationUpdateGate.open,
  target: fetchProtocolsFx,
})
