import { gql } from '@urql/core'

import { USER_FRAGMENT } from './user.fragment.graphql'

export const USERS = gql`
  query Users(
    $filter: WalletListFilterInputType
    $sort: [WalletListSortInputType!]
    $pagination: WalletListPaginationInputType
  ) {
    users {
      list {
        ...user
      }
      pagination {
        count
      }
    }
  }
  ${USER_FRAGMENT}
`
