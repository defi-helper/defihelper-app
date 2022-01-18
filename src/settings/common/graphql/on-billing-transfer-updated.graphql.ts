import { gql } from 'urql'

export const ON_BILLING_TRANSFER_UPDATED = gql`
  subscription OnBillingTransferUpdated($user: [UuidType!]) {
    onBillingTransferUpdated(filter: { user: $user }) {
      id
    }
  }
`
