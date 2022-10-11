import { gql } from 'urql'

import { USER_CONTACT_FRAGMENT } from './user-contact.fragment.graphql'

export const ON_USER_CONTACT_ACTIVATED = gql`
  subscription OnUserContactActivated($user: [UuidType!]) {
    onUserContactActivated(filter: { user: $user }) {
      ...userContactFragment
    }
  }
  ${USER_CONTACT_FRAGMENT}
`
