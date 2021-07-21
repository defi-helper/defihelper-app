import { gql } from '@urql/core'

import { USER_CONTACT_FRAGMENT } from './user-contact.fragment.graphql'

export const USER_CONTACT_CREATE = gql`
  mutation UserContactCreate($input: UserContactCreateInputType!) {
    userContactCreate(input: $input) {
      ...userContactFragment
    }
  }
  ${USER_CONTACT_FRAGMENT}
`
