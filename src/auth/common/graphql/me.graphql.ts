import { gql } from 'urql'

import { USER_FRAGMENT } from './user.fragment.graphql'

export const ME = gql`
  query Me($input: MeInputType) {
    me(input: $input) {
      ...userFragment
    }
  }
  ${USER_FRAGMENT}
`
