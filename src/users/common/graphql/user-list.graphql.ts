import { gql } from '@urql/core'

import { USER_FRAGMENT } from './user.fragment.graphql'

export const USERS = gql`
  query Users(
    $filter: UserListFilterInputType
    $sort: [UserListSortInputType!]
    $pagination: UserListPaginationInputType
  ) {
    users(filter: $filter, sort: $sort, pagination: $pagination) {
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
