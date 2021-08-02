import { gql } from '@urql/core'

export const ADD_WALLET = gql`
  mutation AddWallet($input: AddWalletInputType!) {
    addWallet(input: $input) {
      sid
      user {
        id
      }
    }
  }
`
