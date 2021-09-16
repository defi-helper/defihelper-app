import { createDomain, sample } from 'effector-logger/macro'
import { createGate } from 'effector-react'

import { automationUpdateModel } from '../automation-update'
import { automationApi } from '../common/automation.api'
import { Trigger } from '../common/automation.types'

export const automationListDomain = createDomain()

export const fetchTriggersFx = automationListDomain.createEffect(async () => {
  return automationApi.getTriggers({})
})

export const deleteTriggerFx = automationListDomain.createEffect(
  async (id: string) => {
    return automationApi.deleteTrigger({ id })
  }
)

export const $triggers = automationListDomain
  .createStore<Trigger[]>([])
  .on(fetchTriggersFx.doneData, (_, { list }) => list)
  .on(deleteTriggerFx, (state, triggerId) =>
    state.map((trigger) =>
      trigger.id === triggerId ? { ...trigger, deleting: true } : trigger
    )
  )
  .on(deleteTriggerFx.done, (state, { params }) =>
    state.filter((trigger) => trigger.id !== params)
  )
  .on(automationUpdateModel.updateTriggerFx.doneData, (state, payload) => {
    if (!payload) return undefined

    return state.map((trigger) =>
      trigger.id === payload.id ? payload : trigger
    )
  })

export const AutomationListGate = createGate({
  domain: automationListDomain,
  name: 'AutomationListGate',
})

sample({
  clock: AutomationListGate.open,
  target: fetchTriggersFx,
})
