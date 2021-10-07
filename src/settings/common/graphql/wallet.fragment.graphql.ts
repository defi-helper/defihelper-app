import { gql } from '@urql/core'

export const WALLET_FRAGMENT = gql`
  fragment walletFragment on WalletType {
    id
    blockchain
    network
    address
    publicKey
    name
    createdAt
    billing {
      balance {
        balance
        netBalance
        claim
      }
    }
  }
`
