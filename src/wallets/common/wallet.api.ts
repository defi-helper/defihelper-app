import { getAPIClient } from '~/api'
import {
  WalletConfigQuery,
  WalletConfigQueryVariables,
  WalletMetricScanMutation,
  WalletMetricScanMutationVariables,
} from '~/api/_generated-types'
import { config } from '~/config'
import { WALLET_METRIC_SCAN } from '~/wallets/common/graphql/wallet-metric-scan.graphql'
import { WALLET_CONFIG } from './graphql'

export const walletApi = {
  scanWalletMetric: (variables: WalletMetricScanMutationVariables) =>
    getAPIClient()
      .request<WalletMetricScanMutation, WalletMetricScanMutationVariables>({
        query: WALLET_METRIC_SCAN.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.walletMetricScan),

  getConfig: () =>
    getAPIClient()
      .request<WalletConfigQuery, WalletConfigQueryVariables>({
        query: WALLET_CONFIG.loc?.source.body ?? '',
        variables: {
          filter: {
            testnet: config.IS_DEV,
          },
        },
      })
      .then(({ data }) => data?.config ?? null),
}
