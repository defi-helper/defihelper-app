import { getAPIClient } from '~/api'
import {
  BillingBillsQuery,
  BillingBillsQueryVariables,
  BillingHistoryQuery,
  BillingHistoryQueryVariables,
  BillingQuery,
  BillingQueryVariables,
} from '~/graphql/_generated-types'
import { BILLING, BILLING_HISTORY, BILLING_BILLS } from './graphql'

export const billingApi = {
  balance: () =>
    getAPIClient()
      .query<BillingQuery, BillingQueryVariables>(BILLING, {})
      .toPromise()
      .then(({ data }) => data?.me?.billing.balance),

  history: (variables?: BillingHistoryQueryVariables) =>
    getAPIClient()
      .query<BillingHistoryQuery, BillingHistoryQueryVariables>(
        BILLING_HISTORY,
        variables
      )
      .toPromise()
      .then(({ data }) => ({
        list: data?.me?.billing.transfers.list ?? [],
        count: data?.me?.billing.transfers.pagination.count ?? 0,
      })),

  bills: (variables?: BillingBillsQueryVariables) =>
    getAPIClient()
      .query<BillingBillsQuery, BillingBillsQueryVariables>(
        BILLING_BILLS,
        variables
      )
      .toPromise()
      .then(({ data }) => ({
        list: data?.me?.billing.bills.list ?? [],
        count: data?.me?.billing.bills.pagination.count ?? 0,
      })),
}
