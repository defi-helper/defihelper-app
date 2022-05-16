import { gql } from 'urql'

import { USER_FRAGMENT } from './user.fragment.graphql'

export const AUTH_DEMO = gql`
  mutation AuthDemo {
    authDemo {
      user {
        ...userFragment
      }
      sid
    }
  }
  ${USER_FRAGMENT}
`
