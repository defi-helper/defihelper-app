import { gql } from 'urql'

import { USER_FRAGMENT } from './user.fragment.graphql'

export const AUTH_THROUGH_ADMIN = gql`
  mutation AuthThroughAdmin($userId: UuidType!) {
    authThroughAdmin(userId: $userId) {
      user {
        ...userFragment
      }
      sid
    }
  }
  ${USER_FRAGMENT}
`
