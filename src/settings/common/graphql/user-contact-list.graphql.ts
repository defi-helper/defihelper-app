import { gql } from 'urql'

import { USER_CONTACT_FRAGMENT } from './user-contact.fragment.graphql'

export const USER_CONTACTS = gql`
  query UserContacts(
    $userContactFilter: UserContactListQueryFilterInputType
    $userContactSort: [UserContactListSortInputType!]
    $userContactPagination: UserContactListPaginationInputType
  ) {
    userContacts(
      filter: $userContactFilter
      sort: $userContactSort
      pagination: $userContactPagination
    ) {
      list {
        ...userContactFragment
      }
      pagination {
        count
      }
    }
  }
  ${USER_CONTACT_FRAGMENT}
`
