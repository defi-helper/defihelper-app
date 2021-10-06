import { gql } from '@urql/core'

export const WALLET_DELETE = gql`
  mutation WalletDelete($id: UuidType!) {
    walletDelete(id: $id)
  }
`
