import { getAPIClient } from '~/api'
import {
  AuthEthMutation,
  AuthEthMutationVariables,
  AuthWavesMutation,
  AuthWavesMutationVariables,
  WalletMetricScanMutation,
  WalletMetricScanMutationVariables,
} from '~/graphql/_generated-types'
import { AUTH_ETH, AUTH_WAVES } from './graphql'
import { WALLET_METRIC_SCAN } from '~/wallets/common/graphql/wallet-metric-scan.graphql'

export const walletApi = {
  scanWalletMetric: (wallet: string, contract: string) =>
    getAPIClient()
      .mutation<WalletMetricScanMutation, WalletMetricScanMutationVariables>(
        WALLET_METRIC_SCAN,
        {
          wallet,
          contract,
        }
      )
      .toPromise()
      .then(({ data }) => data?.walletMetricScan),

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
