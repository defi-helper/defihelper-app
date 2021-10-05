import { gql } from '@urql/core'

import { USER_CONTACT_FRAGMENT } from './user-contact.fragment.graphql'

export const USER_CONTACT_UPDATE = gql`
  mutation UserContactUpdate(
    $id: UuidType!
    $input: UserContactUpdateInputType!
  ) {
    userContactUpdate(id: $id, input: $input) {
      ...userContactFragment
    }
  }
  ${USER_CONTACT_FRAGMENT}
`
