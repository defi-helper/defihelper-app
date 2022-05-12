import { gql } from 'urql'

export const WALLET_UPDATE_STATISTICS = gql`
  mutation WalletUpdateStatistics($id: UuidType!) {
    walletUpdateStatistics(id: $id)
  }
`
