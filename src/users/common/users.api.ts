import { getAPIClient } from '~/api'
import {
  UsersQuery,
  UsersQueryVariables,
  MonitoringUsersRegisteringHistoryQuery,
  MonitoringUsersRegisteringHistoryQueryVariables,
  UserUpdateMutation,
  UserUpdateMutationVariables,
} from '~/api/_generated-types'
import { USERS, USER_UPDATE, USER_REGISTERING_HISTORY } from './graphql'

export const usersApi = {
  getUsers: (variables: UsersQueryVariables) =>
    getAPIClient()
      .request<UsersQuery, UsersQueryVariables>({
        query: USERS.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => ({
        list: data?.users.list ?? [],
        count: data?.users.pagination.count ?? 0,
      })),

  updateUser: (variables: UserUpdateMutationVariables) =>
    getAPIClient()
      .request<UserUpdateMutation, UserUpdateMutationVariables>({
        query: USER_UPDATE.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.userUpdate),

  getUsersRegisteringHistory: (
    variables: MonitoringUsersRegisteringHistoryQueryVariables
  ) =>
    getAPIClient()
      .request<
        MonitoringUsersRegisteringHistoryQuery,
        unknown,
        MonitoringUsersRegisteringHistoryQueryVariables
      >({
        query: USER_REGISTERING_HISTORY.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.monitoringUsersRegisteringHistory),
}
