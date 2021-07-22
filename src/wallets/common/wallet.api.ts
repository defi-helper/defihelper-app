import { getAPIClient } from '~/api'
import {
  AuthEthMutation,
  AuthEthMutationVariables,
} from '~/graphql/_generated-types'
import { AUTH_ETH } from './graphql'

export const walletApi = {
  authEth: (input: AuthEthMutationVariables['input']) =>
    getAPIClient()
      .mutation<AuthEthMutation, AuthEthMutationVariables>(AUTH_ETH, {
        input,
      })
      .toPromise()
      .then(({ data }) => data?.authEth),
}
