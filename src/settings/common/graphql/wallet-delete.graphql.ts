import { gql } from 'urql'

export const WALLET_DELETE = gql`
  mutation WalletDelete($id: UuidType!) {
    walletDelete(id: $id)
  }
`
