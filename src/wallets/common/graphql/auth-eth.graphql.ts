import { gql } from 'urql'

import { USER_FRAGMENT } from './user.fragment.graphql'

export const AUTH_ETH = gql`
  mutation AuthEth($input: AuthEthereumInputType!) {
    authEth(input: $input) {
      user {
        ...userFragment
      }
      sid
    }
  }
  ${USER_FRAGMENT}
`
