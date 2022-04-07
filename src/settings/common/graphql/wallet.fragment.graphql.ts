import { gql } from 'urql'

export const WALLET_FRAGMENT = gql`
  fragment walletFragment on WalletBlockchainType {
    id
    blockchain
    network
    address
    publicKey
    name
    createdAt
  }
`
