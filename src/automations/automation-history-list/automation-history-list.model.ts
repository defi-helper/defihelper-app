import { createDomain, sample, restore } from 'effector-logger/macro'
import { createGate } from 'effector-react'

import { automationApi } from '~/automations/common/automation.api'
import { PaginationState } from '~/common/create-pagination'
import { AutomateTriggerCallHistoryType } from '~/graphql/_generated-types'

export const automationHistoryListDomain = createDomain()

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
)

export const $history = automationHistoryListDomain
  .createStore<AutomateTriggerCallHistoryType[]>([])
  .on(fetchHistoryFx.doneData, (_, { list }) => {
    return list
  })

export const AutomationHistoryListGate = createGate<{
  automationId: string
  pagination: PaginationState
}>({
  domain: automationHistoryListDomain,
  name: 'AutomationHistoryListGate',
})

sample({
  source: AutomationHistoryListGate.state,
  clock: [
    AutomationHistoryListGate.open,
    AutomationHistoryListGate.state.updates,
  ],
  target: fetchHistoryFx,
})
