import { getAPIClient } from '~/api'
import {
  WalletMetricScanMutation,
  WalletMetricScanMutationVariables,
} from '~/graphql/_generated-types'
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
}
