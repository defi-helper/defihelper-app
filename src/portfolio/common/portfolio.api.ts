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
  IsPorfolioCollectedQuery,
  IsPorfolioCollectedQueryVariables,
  PortfolioProtocolsQuery,
  PortfolioProtocolsQueryVariables,
  AssetsListByWalletQuery,
  AssetsListByWalletQueryVariables,
  AssetListByProtocolQueryVariables,
  AssetListByProtocolQuery,
  AssetsListByExchangeQueryVariables,
  AssetsListByExchangeQuery,
} from '~/graphql/_generated-types'
import {
  ADD_WALLET,
  BLOCKCHAINS,
  MY_METRIC,
  TOKEN_METRIC,
  TOKEN_METRIC_CHART,
  IS_PORTFOLIO_COLLECTED,
  PORTFOLIO_PROTOCOLS,
  ASSETS_LIST,
  ASSETS_LIST_BY_WALLET,
} from './graphql'
import { ASSETS_LIST_BY_PROTOCOL } from '~/portfolio/common/graphql/assets-list-by-protocol.graphql'
import { ASSETS_LIST_BY_EXCHANGE } from '~/portfolio/common/graphql/assets-list-by-exchange.graphql'

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

  getAssetsListByExchange: (variables: AssetsListByExchangeQueryVariables) =>
    getAPIClient()
      .query<AssetsListByExchangeQuery, AssetsListByExchangeQueryVariables>(
        ASSETS_LIST_BY_EXCHANGE,
        variables
      )
      .toPromise()
      .then(({ data }) => {
        const [exchange = undefined] = data?.me?.exchanges.list ?? []

        return exchange?.tokenAliases.list ?? []
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
      .query<MyMetricQuery, MyMetricQueryVariables>(MY_METRIC, variables, {
        requestPolicy: 'cache-and-network',
      })
      .toPromise()
      .then(({ data }) => data?.me?.metric),

  isPorfolioCollected: (variables?: IsPorfolioCollectedQueryVariables) =>
    getAPIClient()
      .query<IsPorfolioCollectedQuery, IsPorfolioCollectedQueryVariables>(
        IS_PORTFOLIO_COLLECTED,
        variables,
        { requestPolicy: 'cache-and-network' }
      )
      .toPromise()
      .then(({ data }) => Boolean(data?.me?.isPorfolioCollected)),

  getProtocolList: (variables: PortfolioProtocolsQueryVariables) =>
    getAPIClient()
      .query<PortfolioProtocolsQuery, PortfolioProtocolsQueryVariables>(
        PORTFOLIO_PROTOCOLS,
        variables,
        { requestPolicy: 'cache-and-network' }
      )
      .toPromise()
      .then(({ data }) => ({
        list: (data?.protocols.list ?? [])
          .filter((v) => v.metric.myStaked !== '0')
          .sort((v) => Number(v.metric.myStaked)),
        count: data?.protocols.pagination.count ?? 0,
      })),
}
