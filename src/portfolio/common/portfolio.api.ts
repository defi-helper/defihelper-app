import { getAPIClient } from '~/api'
import {
  AddWalletMutation,
  AddWalletMutationVariables,
  BlockChainsQuery,
  BlockChainsQueryVariables,
  TokenMetricChartQuery,
  TokenMetricChartQueryVariables,
  TokenMetricQuery,
  MyMetricQuery,
  MyMetricQueryVariables,
  TokenMetricQueryVariables,
  AssetListQueryVariables,
  AssetListQuery,
  TokenAliasesQuery,
  TokenAliasesQueryVariables,
  AssetsListByWalletQuery,
  AssetsListByWalletQueryVariables,
  AssetListByProtocolQueryVariables,
  AssetListByProtocolQuery,
} from '~/graphql/_generated-types'
import {
  ADD_WALLET,
  BLOCKCHAINS,
  MY_METRIC,
  TOKEN_METRIC,
  TOKEN_METRIC_CHART,
  TOKEN_ALIASSES,
  ASSETS_LIST,
  ASSETS_LIST_BY_WALLET,
} from './graphql'
import { ASSETS_LIST_BY_PROTOCOL } from '~/portfolio/common/graphql/assets-list-by-protocol.graphql'

export const portfolioApi = {
  getTokenMetricChart: (variables: TokenMetricChartQueryVariables) =>
    getAPIClient()
      .query<TokenMetricChartQuery, TokenMetricChartQueryVariables>(
        TOKEN_METRIC_CHART,
        variables
      )
      .toPromise()
      .then(({ data }) => data?.me),

  getBlockchains: (variables: BlockChainsQueryVariables) =>
    getAPIClient()
      .query<BlockChainsQuery, BlockChainsQueryVariables>(
        BLOCKCHAINS,
        variables
      )
      .toPromise()
      .then(({ data }) => data?.me?.blockchains ?? []),

  getAssetsList: (variables: AssetListQueryVariables) =>
    getAPIClient()
      .query<AssetListQuery, AssetListQueryVariables>(ASSETS_LIST, variables)
      .toPromise()
      .then(({ data }) => data?.me?.tokenAliases.list ?? []),

  getAssetsListByWallet: (variables: AssetsListByWalletQueryVariables) =>
    getAPIClient()
      .query<AssetsListByWalletQuery, AssetsListByWalletQueryVariables>(
        ASSETS_LIST_BY_WALLET,
        variables
      )
      .toPromise()
      .then(({ data }) => {
        const [wallet = undefined] = data?.me?.wallets.list ?? []

        return wallet?.tokenAliases.list ?? []
      }),

  getAssetsListByProtocol: (variables: AssetListByProtocolQueryVariables) =>
    getAPIClient()
      .query<AssetListByProtocolQuery, AssetListByProtocolQueryVariables>(
        ASSETS_LIST_BY_PROTOCOL,
        variables
      )
      .toPromise()
      .then(({ data }) => {
        return data?.me?.tokenAliases.list ?? []
      }),

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

  myMetric: (variables?: MyMetricQueryVariables) =>
    getAPIClient()
      .query<MyMetricQuery, MyMetricQueryVariables>(MY_METRIC, variables)
      .toPromise()
      .then(({ data }) => data?.me?.metric),

  tokenAliases: (variables?: TokenAliasesQueryVariables) =>
    getAPIClient()
      .query<TokenAliasesQuery, TokenAliasesQueryVariables>(
        TOKEN_ALIASSES,
        variables,
        { requestPolicy: 'cache-and-network' }
      )
      .toPromise()
      .then(({ data }) => data?.me?.tokenAliases.pagination.count ?? 0),
}
