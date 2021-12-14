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
    triggersCount
    metric(filter: { tokenAlias: { liquidity: [stable, unstable] } }) {
      stakedUSD
      earnedUSD
      usd
    }
    billing {
      balance {
        lowFeeFunds
        balance
        netBalance
        claim
      }
    }
  }
`
