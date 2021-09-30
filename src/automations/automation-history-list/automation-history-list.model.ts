import { createDomain, sample } from 'effector-logger/macro'
import { createGate } from 'effector-react'

import { automationApi } from '~/automations/common/automation.api'
import { createPagination, PaginationState } from '~/common/create-pagination'
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

export const $history = automationHistoryListDomain
  .createStore<AutomateTriggerCallHistoryType[]>([])
  .on(fetchHistoryFx.doneData, (_, { list }) => list)

export const AutomationHistoryPagination = createPagination({
  domain: automationHistoryListDomain,
})

export const AutomationHistoryListGate = createGate<string>({
  domain: automationHistoryListDomain,
  name: 'AutomationHistoryListGate',
})

sample({
  source: [AutomationHistoryPagination.state, AutomationHistoryListGate.state],
  clock: [AutomationHistoryListGate.open, AutomationHistoryPagination.updates],
  fn: ([pagination, automationId]) => ({ pagination, automationId }),
  target: fetchHistoryFx,
})

sample({
  clock: fetchHistoryFx.doneData,
  fn: (clock) => clock.count,
  target: AutomationHistoryPagination.totalElements,
})
