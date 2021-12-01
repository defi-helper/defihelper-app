import { getAPIClient } from '~/api'
import {
  BillingHistoryQuery,
  BillingHistoryQueryVariables,
  UserContactCreateMutation,
  UserContactCreateMutationVariables,
  UserContactDeleteMutation,
  UserContactDeleteMutationVariables,
  UserContactEmailConfirmMutation,
  UserContactEmailConfirmMutationVariables,
  UserContactsQuery,
  UserContactsQueryVariables,
  UserContactUpdateMutation,
  UserContactUpdateMutationVariables,
  WalletDeleteMutation,
  WalletDeleteMutationVariables,
  WalletListQuery,
  WalletListQueryVariables,
  WalletUpdateMutation,
  WalletUpdateMutationVariables,
  UserNotificationsListQuery,
  UserNotificationsListQueryVariables,
  UserNotificationToggleMutationVariables,
  UserNotificationToggleMutation,
} from '~/graphql/_generated-types'
import {
  USER_CONTACTS,
  USER_CONTACT_CREATE,
  USER_CONTACT_DELETE,
  USER_CONTACT_CONFIRM_EMAIL,
  USER_CONTACT_UPDATE,
  WALLET_LIST,
  WALLET_UPDATE,
  WALLET_DELETE,
  BILLING_HISTORY,
  USER_NOTIFICATION_LIST,
  USER_NOTIFICATION_TOGGLE,
} from './graphql'

export const settingsApi = {
  userNotificationsList: () =>
    getAPIClient()
      .query<UserNotificationsListQuery, UserNotificationsListQueryVariables>(
        USER_NOTIFICATION_LIST
      )
      .toPromise()
      .then(({ data }) => data?.userNotifications ?? []),

  userNotificationToggle: (
    variables: UserNotificationToggleMutationVariables
  ) =>
    getAPIClient()
      .mutation<
        UserNotificationToggleMutation,
        UserNotificationToggleMutationVariables
      >(USER_NOTIFICATION_TOGGLE, variables)
      .toPromise()
      .then(({ data }) => data?.userNotificationToggle),

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
      .then(({ data }) => data?.userContactEmailConfirm),

  userContactUpdate: (variables: UserContactUpdateMutationVariables) =>
    getAPIClient()
      .mutation<UserContactUpdateMutation, UserContactUpdateMutationVariables>(
        USER_CONTACT_UPDATE,
        variables
      )
      .toPromise()
      .then(({ data }) => data?.userContactUpdate),

  walletList: (variables: WalletListQueryVariables) =>
    getAPIClient()
      .query<WalletListQuery, WalletListQueryVariables>(WALLET_LIST, variables)
      .toPromise()
      .then(({ data }) => ({
        list: data?.me?.wallets.list ?? [],
        count: data?.me?.wallets.pagination.count ?? 0,
      })),

  walletUpdate: (variables: WalletUpdateMutationVariables) =>
    getAPIClient()
      .query<WalletUpdateMutation, WalletUpdateMutationVariables>(
        WALLET_UPDATE,
        variables
      )
      .toPromise()
      .then(({ data }) => data?.walletUpdate),

  walletDelete: (variables: WalletDeleteMutationVariables) =>
    getAPIClient()
      .query<WalletDeleteMutation, WalletDeleteMutationVariables>(
        WALLET_DELETE,
        variables
      )
      .toPromise()
      .then(({ data }) => data?.walletDelete),

  history: (variables?: BillingHistoryQueryVariables) =>
    getAPIClient()
      .query<BillingHistoryQuery, BillingHistoryQueryVariables>(
        BILLING_HISTORY,
        variables
      )
      .toPromise()
      .then(({ data }) => ({
        list: data?.me?.billing.transfers.list ?? [],
        count: data?.me?.billing.transfers.pagination.count ?? 0,
      })),
}
