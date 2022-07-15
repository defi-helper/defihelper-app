import { gql } from 'urql'

export const WALLET_METRIC_SCAN = gql`
  mutation WalletMetricScan(
    $wallet: UuidType!
    $contract: UuidType!
    $txId: String
  ) {
    walletMetricScan(wallet: $wallet, contract: $contract, txId: $txId)
  }
`
