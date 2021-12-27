import { gql } from 'urql'

export const ON_BILLING_TRANSFER_CREATED = gql`
  subscription OnBillingTransferCreated($wallet: [UuidType!]) {
    onBillingTransferCreated(filter: { wallet: $wallet }) {
      id
    }
  }
`
