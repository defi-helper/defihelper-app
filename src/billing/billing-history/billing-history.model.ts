import { createDomain, sample, restore } from 'effector-logger'
import { createGate } from 'effector-react'

import { billingApi } from '~/billing/common'
import { createPagination, PaginationState } from '~/common/create-pagination'

export const billingHistoryDomain = createDomain('billingHistoryDomain')

export const fetchBillingHistoryFx = billingHistoryDomain.createEffect({
  name: 'fetchBillingHistoryFx',
  handler: async (pagination: PaginationState) =>
    billingApi.history({ pagination }),
})

export const $billingHistory = restore(
  fetchBillingHistoryFx.doneData.map(({ list }) => list),
  []
)

export const BillingHistoryPagination = createPagination({
  domain: billingHistoryDomain,
  limit: 10,
})

export const BillingHistoryGate = createGate({
  name: 'BillingHistoryGate',
  domain: billingHistoryDomain,
})

sample({
  source: BillingHistoryPagination.state,
  clock: [BillingHistoryGate.open, BillingHistoryPagination.updates],
  target: fetchBillingHistoryFx,
})

sample({
  clock: fetchBillingHistoryFx.doneData,
  fn: (clock) => clock.count,
  target: BillingHistoryPagination.totalElements,
})
