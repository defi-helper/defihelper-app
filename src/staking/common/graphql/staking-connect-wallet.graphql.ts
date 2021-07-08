import { gql } from '@urql/core'

export const STAKING_CONNECT_WALLET = gql`
  mutation StakingConnectWallet($contract: UuidType!, $wallet: UuidType!) {
    contractWalletLink(contract: $contract, wallet: $wallet)
  }
`
