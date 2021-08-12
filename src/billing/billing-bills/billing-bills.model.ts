import { createDomain, sample, restore } from 'effector-logger'
import { createGate } from 'effector-react'

import { billingApi } from '~/billing/common'
import { createPagination, PaginationState } from '~/common/create-pagination'

export const billingBillsDomain = createDomain('billingBillsDomain')

export const fetchBillingBillsFx = billingBillsDomain.createEffect({
  name: 'fetchBillingBillsFx',
  handler: async (pagination: PaginationState) =>
    billingApi.bills({ pagination }),
})

export const $billingBills = restore(
  fetchBillingBillsFx.doneData.map(({ list }) => list),
  []
)

export const BillingBillsPagination = createPagination({
  domain: billingBillsDomain,
})

export const BillingBillsGate = createGate({
  name: 'BillingBillsGate',
  domain: billingBillsDomain,
})

sample({
  source: BillingBillsPagination.state,
  clock: [BillingBillsGate.open, BillingBillsPagination.updates],
  target: fetchBillingBillsFx,
})

sample({
  clock: fetchBillingBillsFx.doneData,
  fn: (clock) => clock.count,
  target: BillingBillsPagination.totalElements,
})
