import { getAPIClient } from '~/api'
import {
  UsersQuery,
  UsersQueryVariables,
  UserUpdateMutation,
  UserUpdateMutationVariables,
} from '~/graphql/_generated-types'
import { USERS, USER_UPDATE } from './graphql'

export const usersApi = {
  getUsers: () =>
    getAPIClient()
      .query<UsersQuery, UsersQueryVariables>(USERS)
      .toPromise()
      .then(({ data }) => ({
        list: data?.users.list ?? [],
        count: data?.users.pagination.count ?? 0,
      })),

  updateUser: (variables: UserUpdateMutationVariables) =>
    getAPIClient()
      .mutation<UserUpdateMutation, UserUpdateMutationVariables>(
        USER_UPDATE,
        variables
      )
      .toPromise()
      .then(({ data }) => data?.userUpdate),
}
