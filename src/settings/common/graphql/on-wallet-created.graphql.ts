import { gql } from 'urql'

export const ON_WALLET_CREATED = gql`
  subscription OnWalletCreated($user: [UuidType!]) {
    onWalletCreated(filter: { user: $user }) {
      id
    }
  }
`
