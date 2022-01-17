import { gql } from 'urql'

export const ON_BILLING_TRANSFER_CREATED = gql`
  subscription OnBillingTransferCreated($user: [UuidType!]) {
    onBillingTransferCreated(filter: { user: $user }) {
      id
    }
  }
`
