import { getAPIClient } from '~/api'
import {
  MeQuery,
  MeQueryVariables,
  AuthEthMutationVariables,
  AuthEthMutation,
  AuthWavesMutationVariables,
  AuthWavesMutation,
} from '~/graphql/_generated-types'
import { ME, AUTH_ETH, AUTH_WAVES } from './graphql'

export const authApi = {
  me: () =>
    getAPIClient()
      .query<MeQuery, MeQueryVariables>(ME)
      .toPromise()
      .then(({ data }) => data?.me),

  authEth: (input: AuthEthMutationVariables['input']) =>
    getAPIClient()
      .mutation<AuthEthMutation, AuthEthMutationVariables>(
        AUTH_ETH,
        {
          input,
        },
        { requestPolicy: 'network-only' }
      )
      .toPromise()
      .then(({ data }) => data?.authEth),

  authWaves: (input: AuthWavesMutationVariables['input']) =>
    getAPIClient()
      .mutation<AuthWavesMutation, AuthWavesMutationVariables>(
        AUTH_WAVES,
        {
          input,
        },
        { requestPolicy: 'network-only' }
      )
      .toPromise()
      .then(({ data }) => data?.authWaves),
}
