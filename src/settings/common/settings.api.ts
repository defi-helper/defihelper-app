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
  BillingTransferCreateMutationVariables,
  BillingTransferCreateMutation,
  IntegrationListQuery,
  IntegrationListQueryVariables,
  IntegrationDisconnectMutation,
  IntegrationDisconnectMutationVariables,
  IntegrationExchangeApiConnectMutationVariables,
  IntegrationExchangeApiConnectMutation,
  WalletListMetricsQueryVariables,
  WalletListMetricsQuery,
  WalletUpdateStatisticsMutation,
  WalletUpdateStatisticsMutationVariables,
  BillingBalanceQueryVariables,
  BillingBalanceQuery,
} from '~/api/_generated-types'
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
  WALLET_EXCHANGE_LIST,
  INTEGRATION_API_CONNECT,
  INTEGRATION_DISCONNECT,
  WALLET_LIST_METRICS,
  BILLING_TRANSFER_CREATE,
  WALLET_UPDATE_STATISTICS,
  BILLING_BALANCE,
} from './graphql'

export const settingsApi = {
  userNotificationsList: () =>
    getAPIClient()
      .request<
        UserNotificationsListQuery,
        unknown,
        UserNotificationsListQueryVariables
      >({
        query: USER_NOTIFICATION_LIST.loc?.source.body ?? '',
      })
      .then(({ data }) =>
        (data?.userNotifications ?? []).reduce<
          Record<
            string,
            UserNotificationsListQuery['userNotifications'][number]
          >
        >((acc, notification) => {
          acc[notification.contact] = notification

          return acc
        }, {})
      ),

  billingTransferCreate: (variables: BillingTransferCreateMutationVariables) =>
    getAPIClient()
      .request<
        BillingTransferCreateMutation,
        BillingTransferCreateMutationVariables
      >({
        query: BILLING_TRANSFER_CREATE.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.billingTransferCreate),

  userNotificationToggle: (
    variables: UserNotificationToggleMutationVariables
  ) =>
    getAPIClient()
      .request<
        UserNotificationToggleMutation,
        unknown,
        UserNotificationToggleMutationVariables
      >({
        query: USER_NOTIFICATION_TOGGLE.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.userNotificationToggle),

  userContactList: (variables: UserContactsQueryVariables) =>
    getAPIClient()
      .request<UserContactsQuery, unknown, UserContactsQueryVariables>({
        query: USER_CONTACTS.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.userContacts.list ?? []),

  userContactCreate: (variables: UserContactCreateMutationVariables) =>
    getAPIClient()
      .request<
        UserContactCreateMutation,
        unknown,
        UserContactCreateMutationVariables
      >({
        query: USER_CONTACT_CREATE.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.userContactCreate),

  userContactDelete: (variables: UserContactDeleteMutationVariables) =>
    getAPIClient()
      .request<
        UserContactDeleteMutation,
        unknown,
        UserContactDeleteMutationVariables
      >({
        query: USER_CONTACT_DELETE.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.userContactDelete),

  userContactConfirmEmail: (
    variables: UserContactEmailConfirmMutationVariables
  ) =>
    getAPIClient()
      .request<
        UserContactEmailConfirmMutation,
        unknown,
        UserContactEmailConfirmMutationVariables
      >({
        query: USER_CONTACT_CONFIRM_EMAIL.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.userContactEmailConfirm),

  userContactUpdate: (variables: UserContactUpdateMutationVariables) =>
    getAPIClient()
      .request<
        UserContactUpdateMutation,
        unknown,
        UserContactUpdateMutationVariables
      >({
        query: USER_CONTACT_UPDATE.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.userContactUpdate),

  walletList: (variables?: WalletListQueryVariables) =>
    getAPIClient()
      .request<WalletListQuery, unknown, WalletListQueryVariables>({
        query: WALLET_LIST.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => ({
        list: data?.me?.wallets.list ?? [],
        count: data?.me?.wallets.pagination.count ?? 0,
      })),

  walletListMetrics: (
    variables?: WalletListMetricsQueryVariables,
    signal?: AbortSignal
  ) =>
    getAPIClient()
      .request<
        WalletListMetricsQuery,
        unknown,
        WalletListMetricsQueryVariables
      >(
        {
          query: WALLET_LIST_METRICS.loc?.source.body ?? '',
          variables,
        },
        {
          fetchOptionsOverrides: {
            signal,
          },
        }
      )
      .then(({ data }) =>
        (data?.me?.wallets.list ?? []).reduce<
          Record<
            string,
            | Omit<
                Exclude<
                  Exclude<
                    WalletListMetricsQuery['me'],
                    null | undefined
                  >['wallets']['list'],
                  null | undefined
                >[number],
                'id'
              >
            | undefined
          >
        >(
          (acc, { id, ...wallet }) => ({
            ...acc,
            [id]: wallet,
          }),
          {}
        )
      ),

  integrationList: (variables?: IntegrationListQueryVariables) =>
    getAPIClient()
      .request<IntegrationListQuery, unknown, IntegrationListQueryVariables>({
        query: WALLET_EXCHANGE_LIST.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.me?.exchanges.list ?? []),

  integrationExchangeApiConnect: (
    variables: IntegrationExchangeApiConnectMutationVariables
  ) =>
    getAPIClient()
      .request<
        IntegrationExchangeApiConnectMutation,
        unknown,
        IntegrationExchangeApiConnectMutationVariables
      >({
        query: INTEGRATION_API_CONNECT.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.integrationExchangeApiConnect),

  integrationDisconnect: (id: string) =>
    getAPIClient()
      .request<
        IntegrationDisconnectMutation,
        unknown,
        IntegrationDisconnectMutationVariables
      >({
        query: INTEGRATION_DISCONNECT.loc?.source.body ?? '',
        variables: { id },
      })
      .then(({ data }) => data?.integrationDisconnect),

  walletUpdate: (variables: WalletUpdateMutationVariables) =>
    getAPIClient()
      .request<WalletUpdateMutation, unknown, WalletUpdateMutationVariables>({
        query: WALLET_UPDATE.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.walletUpdate),

  walletDelete: (variables: WalletDeleteMutationVariables) =>
    getAPIClient()
      .request<WalletDeleteMutation, unknown, WalletDeleteMutationVariables>({
        query: WALLET_DELETE.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.walletDelete),

  walletUpdateStatistics: (variables: WalletDeleteMutationVariables) =>
    getAPIClient()
      .request<
        WalletUpdateStatisticsMutation,
        unknown,
        WalletUpdateStatisticsMutationVariables
      >({
        query: WALLET_UPDATE_STATISTICS.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.walletUpdateStatistics),

  history: (variables?: BillingHistoryQueryVariables) =>
    getAPIClient()
      .request<BillingHistoryQuery, unknown, BillingHistoryQueryVariables>({
        query: BILLING_HISTORY.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => ({
        list: data?.me?.billing.transfers.list ?? [],
        count: data?.me?.billing.transfers.pagination.count ?? 0,
      })),

  billingBalance: (variables: BillingBalanceQueryVariables) =>
    getAPIClient()
      .request<BillingBalanceQuery, unknown, BillingBalanceQueryVariables>({
        query: BILLING_BALANCE.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => ({
        priceUSD: data?.billingBalance.priceUSD,
        recomendedIncome: data?.billingBalance.recomendedIncome,
        token: data?.billingBalance.token,
      })),
}
