import { getAPIClient } from '~/api'
import {
  AddWalletMutation,
  AddWalletMutationVariables,
  BlockChainsQuery,
  BlockChainsQueryVariables,
  TokenMetricChartQuery,
  TokenMetricChartQueryVariables,
  TokenMetricQuery,
  TokenMetricQueryVariables,
} from '~/graphql/_generated-types'
import { ADD_WALLET, BLOCKCHAINS, TOKEN_METRIC } from './graphql'
import { TOKEN_METRIC_CHART } from './graphql/token-metrick-chart.graphql'

export const portfolioApi = {
  getTokenMetricChart: (variables: TokenMetricChartQueryVariables) =>
    getAPIClient()
      .query<TokenMetricChartQuery, TokenMetricChartQueryVariables>(
        TOKEN_METRIC_CHART,
        variables
      )
      .toPromise()
      .then(({ data }) => data?.me?.tokenMetricChart ?? []),

  getBlockchains: (variables: BlockChainsQueryVariables) =>
    getAPIClient()
      .query<BlockChainsQuery, BlockChainsQueryVariables>(
        BLOCKCHAINS,
        variables
      )
      .toPromise()
      .then(({ data }) => data?.me?.blockchains ?? []),

  addWallet: (variables: AddWalletMutationVariables) =>
    getAPIClient()
      .mutation<AddWalletMutation, AddWalletMutationVariables>(
        ADD_WALLET,
        variables
      )
      .toPromise()
      .then(({ data }) => data?.addWallet),

  getTokenMetric: (variables?: TokenMetricQueryVariables) =>
    getAPIClient()
      .query<TokenMetricQuery, TokenMetricQueryVariables>(
        TOKEN_METRIC,
        variables
      )
      .toPromise()
      .then(({ data }) => data?.me),
}
