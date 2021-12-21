import { createDomain, sample, guard, restore } from 'effector-logger/macro'
import { createGate } from 'effector-react'

import {
  AutomationContractFragmentFragment,
  UserType,
} from '~/graphql/_generated-types'
import { authModel } from '~/auth'
import * as automationUpdateModel from '~/automations/automation-update/automation-update.model'
import * as automationDeployModel from '~/automations/automation-deploy-contract/automation-deploy-contract.model'
import { automationApi } from '../common/automation.api'
import { Trigger } from '../common/automation.types'
import { toastsService } from '~/toasts'

export const automationListDomain = createDomain()

export const fetchTriggersFx = automationListDomain.createEffect(async () => {
  return automationApi.getTriggers({})
})

export const deleteTriggerFx = automationListDomain.createEffect(
  async (id: string) => {
    return automationApi.deleteTrigger({ id })
  }
)

export const toggleTriggerFx = automationListDomain.createEffect(
  async (params: { triggerId: string; active: boolean }) => {
    const data = await automationApi.updateTrigger({
      input: { id: params.triggerId, active: params.active },
    })

    if (!data) throw new Error('something went wrong')

    return data
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
  .on(automationUpdateModel.createTriggerFx.doneData, (state, payload) => [
    ...state,
    payload,
  ])
  .on(automationUpdateModel.updateTriggerFx.doneData, (state, payload) =>
    state.map((trigger) => (trigger.id === payload.id ? payload : trigger))
  )
  .on(toggleTriggerFx.doneData, (state, payload) =>
    state.map((trigger) => (trigger.id === payload.id ? payload : trigger))
  )
  .on(deleteTriggerFx.done, (state, { params }) =>
    state.filter((trigger) => trigger.id !== params)
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

export const fetchContractsFx = automationListDomain.createEffect(
  async (userId: string) => {
    return automationApi.getContracts({ filter: { user: userId } })
  }
)

export const deleteContractFx = automationListDomain.createEffect(
  async (contractId: string) => {
    const isDeleted = await automationApi.deleteContract({ id: contractId })

    if (!isDeleted) throw new Error('contract is not deleted')
  }
)

export const setUpdateContract =
  automationListDomain.createEvent<AutomationContractFragmentFragment>()

export const $contracts = automationListDomain
  .createStore<(AutomationContractFragmentFragment & { deleting?: boolean })[]>(
    []
  )
  .on(fetchContractsFx.doneData, (_, { list }) => list)
  .on(automationDeployModel.deployFx.doneData, (state, payload) => [
    ...state,
    payload,
  ])
  .on(setUpdateContract, (state, payload) =>
    state.map((contract) => (contract.id === payload.id ? payload : contract))
  )
  .on(deleteContractFx, (state, payload) =>
    state.map((contract) =>
      contract.id === payload ? { ...contract, deleting: true } : contract
    )
  )
  .on(deleteContractFx.done, (state, { params }) =>
    state.filter((contract) => contract.id !== params)
  )

sample({
  clock: guard({
    source: [authModel.$user, AutomationListGate.status],
    clock: [authModel.$user.updates, AutomationListGate.open],
    filter: (source): source is [UserType, boolean] => {
      const [user, status] = source

      return Boolean(user?.id) && status
    },
  }),
  fn: ([user]) => user.id,
  target: fetchContractsFx,
})

const fetchDescriptionFx = automationListDomain.createEffect(
  automationApi.getDescription
)

export const $descriptions = restore(fetchDescriptionFx.doneData, null)

export const fetchBalanceFx = automationListDomain.createEffect(
  automationApi.getBalance
)

export const $balance = restore(fetchBalanceFx.doneData, 0)

sample({
  clock: AutomationListGate.open,
  target: [fetchDescriptionFx, fetchBalanceFx],
})

sample({
  clock: [
    automationUpdateModel.createTriggerFx.doneData,
    automationUpdateModel.updateTriggerFx.doneData,
  ],
  fn: () => 'Saved!',
  target: toastsService.success,
})
