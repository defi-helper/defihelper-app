import { getAPIClient } from '~/api'
import {
  WalletMetricScanMutation,
  WalletMetricScanMutationVariables,
} from '~/api/_generated-types'
import { WALLET_METRIC_SCAN } from '~/wallets/common/graphql/wallet-metric-scan.graphql'

export const walletApi = {
  scanWalletMetric: (wallet: string, contract: string) =>
    getAPIClient()
      .request<WalletMetricScanMutation, WalletMetricScanMutationVariables>({
        query: WALLET_METRIC_SCAN.loc?.source.body ?? '',
        variables: {
          wallet,
          contract,
        },
      })
      .then(({ data }) => data?.walletMetricScan),
}
