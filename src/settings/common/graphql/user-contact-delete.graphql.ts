import { gql } from 'urql'

export const USER_CONTACT_DELETE = gql`
  mutation UserContactDelete($id: UuidType!) {
    userContactDelete(id: $id)
  }
`
