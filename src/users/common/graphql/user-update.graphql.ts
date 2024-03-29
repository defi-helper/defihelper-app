import { gql } from 'urql'

export const USER_UPDATE = gql`
  mutation UserUpdate($id: UuidType!, $input: UserUpdateInputType!) {
    userUpdate(id: $id, input: $input) {
      id
      role
      id
      role
      name
      createdAt
    }
  }
`
