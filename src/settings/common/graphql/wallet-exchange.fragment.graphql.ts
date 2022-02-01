import { gql } from 'urql'

export const WALLET_EXCHANGE_FRAGMENT = gql`
  fragment walletExchangeFragment on WalletExchangeType {
    id
    exchange
    account
  }
`
