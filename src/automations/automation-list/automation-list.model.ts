import { createDomain, sample, guard, restore } from 'effector-logger/macro'
import { createGate } from 'effector-react'

import {
  StakingAutomatesContractFragmentFragment,
  UserType,
} from '~/api/_generated-types'
import { authModel } from '~/auth'
import * as automationUpdateModel from '~/automations/automation-update/automation-update.model'
import * as automationDeployModel from '~/automations/automation-deploy-contract/automation-deploy-contract.model'
import { automationApi } from '../common/automation.api'
import { Trigger } from '../common/automation.types'
import { toastsService } from '~/toasts'
import { stakingApi } from '~/staking/common'

export const automationListDomain = createDomain()

export const AutomationListGate = createGate<string>({
  domain: automationListDomain,
  name: 'AutomationListGate',
  defaultState: '',
})

export const fetchTriggersFx = automationListDomain.createEffect(
  async (search: string) => {
    return automationApi.getTriggers(
      search
        ? {
            filter: {
              search,
            },
          }
        : {}
    )
  }
)

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
          list: trigger.actions.list?.filter((action) => action.id !== params),
        },
        conditions: {
          ...trigger.conditions,
          list: trigger.conditions.list?.filter(
            (condition) => condition.id !== params
          ),
        },
      }))
  )
  .reset(authModel.logoutFx, AutomationListGate.close)

sample({
  source: AutomationListGate.state,
  clock: [AutomationListGate.open, AutomationListGate.state.updates],
  target: fetchTriggersFx,
})

export const fetchContractsFx = automationListDomain.createEffect(
  async (userId: string) => {
    return stakingApi.automatesContractList({
      filter: {
        user: userId,
      },
    })
  }
)

export const deleteContractFx = automationListDomain.createEffect(
  async (contractId: string) => {
    const isDeleted = await stakingApi.deleteAutomatesContract({
      id: contractId,
    })

    if (!isDeleted) throw new Error('contract is not deleted')
  }
)

export const setUpdateContract =
  automationListDomain.createEvent<StakingAutomatesContractFragmentFragment>()

export const $contracts = automationListDomain
  .createStore<
    (StakingAutomatesContractFragmentFragment & { deleting?: boolean })[]
  >([])
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
  .reset(authModel.logoutFx, AutomationListGate.close)

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

export const $descriptions = restore(fetchDescriptionFx.doneData, null).reset(
  authModel.logoutFx,
  AutomationListGate.close
)

export const fetchBalanceFx = automationListDomain.createEffect(() =>
  automationApi.getBalance()
)

export const $balance = restore(fetchBalanceFx.doneData, 0).reset(
  authModel.logoutFx,
  AutomationListGate.close
)

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
