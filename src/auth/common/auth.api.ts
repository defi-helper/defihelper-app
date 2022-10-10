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
  MePortfolioNameQuery,
  MePortfolioNameQueryVariables,
} from '~/api/_generated-types'
import { ME, AUTH_ETH, AUTH_WAVES } from './graphql'
import { AUTH_DEMO } from './graphql/auth-demo.graphql'
import { AUTH_THROUGH_ADMIN } from './graphql/auth-through-admin.graphql'
import { ME_PORTFOLIO_NAME } from './graphql/me-portfolio-name.graphql'

export const authApi = {
  me: (variables: MeQueryVariables) =>
    getAPIClient()
      .request<MeQuery, unknown, MeQueryVariables>({
        query: ME.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.me),

  mePortfolioName: () =>
    getAPIClient()
      .request<MePortfolioNameQuery, unknown, MePortfolioNameQueryVariables>({
        query: ME_PORTFOLIO_NAME.loc?.source.body ?? '',
      })
      .then(({ data }) => data?.me?.name),

  authEth: (input: AuthEthMutationVariables['input']) =>
    getAPIClient()
      .request<AuthEthMutation, unknown, AuthEthMutationVariables>({
        query: AUTH_ETH.loc?.source.body ?? '',
        variables: {
          input,
        },
      })
      .then(({ data, error }) => ({ data: data?.authEth, error })),

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
      .then(({ data, error }) => ({ data: data?.authWaves, error })),

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
