import { gql } from 'urql'

import { WALLET_FRAGMENT } from './wallet.fragment.graphql'

export const WALLET_UPDATE = gql`
  mutation WalletUpdate($id: UuidType!, $input: WalletUpdateInputType!) {
    walletUpdate(id: $id, input: $input) {
      ...walletFragment
    }
  }
  ${WALLET_FRAGMENT}
`
