import { gql } from '@urql/core'

export const STAKING_DISCONNECT_WALLET = gql`
  mutation StakingDisconnectWallet($contract: UuidType!, $wallet: UuidType!) {
    contractWalletUnlink(contract: $contract, wallet: $wallet)
  }
`
