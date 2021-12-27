import { gql } from 'urql'

export const BILLING_TRANSFER_CREATE = gql`
  mutation BillingTransferCreate($input: BillingTransferCreateInputType!) {
    billingTransferCreate(input: $input) {
      id
    }
  }
`
