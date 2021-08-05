import { getAPIClient } from '~/api'
import {
  AuthEthMutation,
  AuthEthMutationVariables,
  AuthWavesMutation,
  AuthWavesMutationVariables,
} from '~/graphql/_generated-types'
import { AUTH_ETH, AUTH_WAVES } from './graphql'

export const walletApi = {
  authEth: (input: AuthEthMutationVariables['input']) =>
    getAPIClient()
      .mutation<AuthEthMutation, AuthEthMutationVariables>(AUTH_ETH, {
        input,
      })
      .toPromise()
      .then(({ data }) => data?.authEth),

  authWaves: (input: AuthWavesMutationVariables['input']) =>
    getAPIClient()
      .mutation<AuthWavesMutation, AuthWavesMutationVariables>(AUTH_WAVES, {
        input,
      })
      .toPromise()
      .then(({ data }) => data?.authWaves),
}
