import { getAPIClient } from '~/api'
import {
  UserContactCreateMutation,
  UserContactCreateMutationVariables,
  UserContactDeleteMutation,
  UserContactDeleteMutationVariables,
  UserContactEmailConfirmMutation,
  UserContactEmailConfirmMutationVariables,
  UserContactsQuery,
  UserContactsQueryVariables
} from '~/graphql/_generated-types'
import {
  USER_CONTACTS,
  USER_CONTACT_CREATE,
  USER_CONTACT_DELETE
} from './graphql'
import { USER_CONTACT_CONFIRM_EMAIL } from '~/user-contacts/common/graphql'

export const userContactApi = {
  userContactList: (variables: UserContactsQueryVariables) =>
    getAPIClient()
      .query<UserContactsQuery, UserContactsQueryVariables>(
        USER_CONTACTS,
        variables
      )
      .toPromise()
      .then(({ data }) => data?.userContacts.list ?? []),

  userContactCreate: (variables: UserContactCreateMutationVariables) =>
    getAPIClient()
      .mutation<UserContactCreateMutation, UserContactCreateMutationVariables>(
        USER_CONTACT_CREATE,
        variables
      )
      .toPromise()
      .then(({ data }) => data?.userContactCreate),

  userContactDelete: (variables: UserContactDeleteMutationVariables) =>
    getAPIClient()
      .mutation<UserContactDeleteMutation, UserContactDeleteMutationVariables>(
        USER_CONTACT_DELETE,
        variables
      )
      .toPromise()
      .then(({ data }) => data?.userContactDelete),

  userContactConfirmEmail: (
    variables: UserContactEmailConfirmMutationVariables
  ) =>
    getAPIClient()
      .mutation<
        UserContactEmailConfirmMutation,
        UserContactEmailConfirmMutationVariables
      >(USER_CONTACT_CONFIRM_EMAIL, variables)
      .toPromise()
      .then(({ data }) => data?.userContactEmailConfirm)
}
