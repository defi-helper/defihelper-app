import { gql } from 'urql'

export const BLOCKCHAINS_SELECT = gql`
  query BlockchainsSelect($testnet: Boolean, $autorestake: Boolean) {
    config {
      blockchain {
        ethereum(
          filter: { testnet: $testnet, automate: { autorestake: $autorestake } }
        ) {
          id
          title
          icon
        }
      }
    }
  }
`
