import { createDomain, sample, restore } from 'effector'
import { createGate } from 'effector-react'

import { automationApi } from '~/automations/common/automation.api'
import { PaginationState } from '~/common/create-pagination'
import { AutomateTriggerCallHistoryType } from '~/api/_generated-types'
import { authModel } from '~/auth'

export const automationHistoryListDomain = createDomain()

export const AutomationHistoryListGate = createGate<{
  automationId: string
  pagination: PaginationState
}>({
  domain: automationHistoryListDomain,
  name: 'AutomationHistoryListGate',
})

export const fetchHistoryFx = automationHistoryListDomain.createEffect(
  (params: { pagination: PaginationState; automationId: string }) =>
    automationApi.getHistory({
      filter: {
        id: params.automationId,
      },
      callHistoryPagination: params.pagination,
    })
)

export const $count = restore(
  fetchHistoryFx.doneData.map(({ count }) => count),
  0
).reset(AutomationHistoryListGate.close, authModel.logoutFx)

export const $history = automationHistoryListDomain
  .createStore<AutomateTriggerCallHistoryType[]>([])
  .on(fetchHistoryFx.doneData, (_, { list }) => list)
  .reset(AutomationHistoryListGate.close, authModel.logoutFx)

sample({
  source: AutomationHistoryListGate.state,
  clock: [
    AutomationHistoryListGate.open,
    AutomationHistoryListGate.state.updates,
  ],
  target: fetchHistoryFx,
})
