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
    triggersCount
    metric(filter: { tokenAlias: { liquidity: [stable, unstable] } }) {
      stakedUSD
      earnedUSD
      usd
      worth
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
