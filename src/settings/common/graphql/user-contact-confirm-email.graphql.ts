import { gql } from '@urql/core'

export const USER_CONTACT_CONFIRM_EMAIL = gql`
  mutation UserContactEmailConfirm($input: UserContactConfirmEmailInputType!) {
    userContactEmailConfirm(input: $input)
  }
`
