import { getAPIClient } from '~/api'
import { BillingQuery, BillingQueryVariables } from '~/graphql/_generated-types'
import { BILLING } from './graphql'

export const billingApi = {
  balance: () =>
    getAPIClient()
      .query<BillingQuery, BillingQueryVariables>(BILLING, {})
      .toPromise()
      .then(({ data }) => data?.me?.billing.balance),
}
