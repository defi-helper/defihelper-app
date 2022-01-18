import { gql } from 'urql'

import { USER_FRAGMENT } from './user.fragment.graphql'

export const ME = gql`
  query Me {
    me {
      ...userFragment
    }
  }
  ${USER_FRAGMENT}
`
