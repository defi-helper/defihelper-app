import { gql } from '@urql/core'

export const USER_CONTACT_DELETE = gql`
  mutation UserContactDelete($id: UuidType!) {
    userContactDelete(id: $id)
  }
`
