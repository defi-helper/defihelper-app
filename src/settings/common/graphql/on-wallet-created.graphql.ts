import { gql } from 'urql'

import { WALLET_FRAGMENT } from './wallet.fragment.graphql'

export const ON_WALLET_CREATED = gql`
  subscription OnWalletCreated($user: [UuidType!]) {
    onWalletCreated(filter: { user: $user }) {
      ...walletFragment
    }
  }
  ${WALLET_FRAGMENT}
`
