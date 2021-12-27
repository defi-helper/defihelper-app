import { gql } from 'urql'

export const ON_BILLING_TRANSFER_UPDATED = gql`
  subscription OnBillingTransferUpdated($wallet: [UuidType!]) {
    onBillingTransferUpdated(filter: { wallet: $wallet }) {
      id
    }
  }
`
