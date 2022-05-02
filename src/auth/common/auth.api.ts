import { getAPIClient } from '~/api'
import {
  MeQuery,
  MeQueryVariables,
  AuthEthMutationVariables,
  AuthEthMutation,
  AuthWavesMutationVariables,
  AuthWavesMutation,
} from '~/api/_generated-types'
import { ME, AUTH_ETH, AUTH_WAVES } from './graphql'

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

  authWaves: (input: AuthWavesMutationVariables['input']) =>
    getAPIClient()
      .request<AuthWavesMutation, unknown, AuthWavesMutationVariables>({
        query: AUTH_WAVES.loc?.source.body ?? '',
        variables: {
          input,
        },
      })
      .then(({ data }) => data?.authWaves),
}
