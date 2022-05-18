import { getAPIClient } from '~/api'
import {
  MeQuery,
  MeQueryVariables,
  AuthEthMutationVariables,
  AuthEthMutation,
  AuthWavesMutationVariables,
  AuthWavesMutation,
  AuthDemoMutation,
  AuthDemoMutationVariables,
  AuthThroughAdminMutationVariables,
  AuthThroughAdminMutation,
} from '~/api/_generated-types'
import { ME, AUTH_ETH, AUTH_WAVES } from './graphql'
import { AUTH_DEMO } from './graphql/auth-demo.graphql'
import { AUTH_THROUGH_ADMIN } from './graphql/auth-through-admin.graphql'

export const authApi = {
  me: () =>
    getAPIClient()
      .request<MeQuery, unknown, MeQueryVariables>({
        query: ME.loc?.source.body ?? '',
      })
      .then(({ data }) => data?.me),

  authEth: (input: AuthEthMutationVariables['input']) =>
    getAPIClient()
      .request<AuthEthMutation, unknown, AuthEthMutationVariables>({
        query: AUTH_ETH.loc?.source.body ?? '',
        variables: {
          input,
        },
      })
      .then(({ data }) => data?.authEth),

  authDemo: () =>
    getAPIClient()
      .request<AuthDemoMutation, unknown, AuthDemoMutationVariables>({
        query: AUTH_DEMO.loc?.source.body ?? '',
      })
      .then(({ data }) => data?.authDemo),

  authWaves: (input: AuthWavesMutationVariables['input']) =>
    getAPIClient()
      .request<AuthWavesMutation, unknown, AuthWavesMutationVariables>({
        query: AUTH_WAVES.loc?.source.body ?? '',
        variables: {
          input,
        },
      })
      .then(({ data }) => data?.authWaves),

  authThroughAdmin: (userId: AuthThroughAdminMutationVariables['userId']) =>
    getAPIClient()
      .request<
        AuthThroughAdminMutation,
        unknown,
        AuthThroughAdminMutationVariables
      >({
        query: AUTH_THROUGH_ADMIN.loc?.source.body ?? '',
        variables: {
          userId,
        },
      })
      .then(({ data }) => data?.authThroughAdmin),
}
