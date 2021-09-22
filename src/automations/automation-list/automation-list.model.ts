import { createDomain, sample, guard } from 'effector-logger/macro'
import { createGate } from 'effector-react'
import {
  AutomationContractFragmentFragment,
  UserType,
} from '~/graphql/_generated-types'
import { userModel } from '~/users'

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
  .on(automationUpdateModel.updateTriggerFx.doneData, (state, payload) =>
    state.map((trigger) => (trigger.id === payload.id ? payload : trigger))
  )
  .on(automationUpdateModel.updateActionFx.doneData, (state, payload) => {
    return state.map((trigger) => ({
      ...trigger,
      actions: {
        ...trigger.actions,
        list: trigger.actions.list?.map((action) =>
          action.id === payload.id ? payload : action
        ),
      },
    }))
  })
  .on(automationUpdateModel.createActionFx.doneData, (state, payload) => {
    return state.map((trigger) => ({
      ...trigger,
      actions: {
        ...trigger.actions,
        list: [...(trigger.actions.list ?? []), payload],
      },
    }))
  })
  .on(automationUpdateModel.updateConditionFx.doneData, (state, payload) => {
    return state.map((trigger) => ({
      ...trigger,
      conditions: {
        ...trigger.conditions,
        list: trigger.conditions.list?.map((condition) =>
          condition.id === payload.id ? payload : condition
        ),
      },
    }))
  })
  .on(automationUpdateModel.createConditionFx.doneData, (state, payload) => {
    return state.map((trigger) => ({
      ...trigger,
      conditions: {
        ...trigger.conditions,
        list: [...(trigger.conditions.list ?? []), payload],
      },
    }))
  })
  .on(
    [
      automationUpdateModel.deleteActionFx.done,
      automationUpdateModel.deleteConditonFx.done,
    ],
    (state, { params }) =>
      state.map((trigger) => ({
        ...trigger,
        actions: {
          ...trigger.actions,
          list: trigger.actions.list?.filter((action) => action.id === params),
        },
        conditions: {
          ...trigger.conditions,
          list: trigger.conditions.list?.filter(
            (condition) => condition.id === params
          ),
        },
      }))
  )

export const AutomationListGate = createGate({
  domain: automationListDomain,
  name: 'AutomationListGate',
})

sample({
  clock: AutomationListGate.open,
  target: fetchTriggersFx,
})

export const fetchContracts = automationListDomain.createEffect(
  async (userId: string) => {
    return automationApi.getContracts({ filter: { user: userId } })
  }
)

export const setNewContract =
  automationListDomain.createEvent<AutomationContractFragmentFragment>()

export const $contracts = automationListDomain
  .createStore<AutomationContractFragmentFragment[]>([])
  .on(fetchContracts.doneData, (_, { list }) => list)
  .on(setNewContract, (state, payload) => [...state, payload])

sample({
  clock: guard({
    source: [userModel.$user, AutomationListGate.status],
    clock: [userModel.$user.updates, AutomationListGate.open],
    filter: (source): source is [UserType, boolean] => {
      const [user, status] = source

      return Boolean(user?.id) && status
    },
  }),
  fn: ([user]) => user.id,
  target: fetchContracts,
})
