import { gql } from '@urql/core'

import { USER_FRAGMENT } from './user.fragment.graphql'

export const AUTH_WAVES = gql`
  mutation AuthWaves(
    $input: AuthWavesInputType!
    $filter: WalletListFilterInputType
    $sort: [WalletListSortInputType!]
    $pagination: WalletListPaginationInputType
  ) {
    authWaves(input: $input) {
      user {
        ...userFragment
      }
      sid
    }
  }
  ${USER_FRAGMENT}
`
