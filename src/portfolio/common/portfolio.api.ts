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
} from '~/api/_generated-types'
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
      .request<TokenMetricChartQuery, unknown, TokenMetricChartQueryVariables>({
        query: TOKEN_METRIC_CHART.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.me),

  getBlockchains: (variables: BlockChainsQueryVariables) =>
    getAPIClient()
      .request<BlockChainsQuery, unknown, BlockChainsQueryVariables>({
        query: BLOCKCHAINS.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.me?.blockchains ?? []),

  getAssetsList: (variables: AssetListQueryVariables) =>
    getAPIClient()
      .request<AssetListQuery, unknown, AssetListQueryVariables>({
        query: ASSETS_LIST.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.me?.tokenAliases.list ?? []),

  getAssetsListByWallet: (variables: AssetsListByWalletQueryVariables) =>
    getAPIClient()
      .request<
        AssetsListByWalletQuery,
        unknown,
        AssetsListByWalletQueryVariables
      >({
        query: ASSETS_LIST_BY_WALLET.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => {
        const [wallet = undefined] = data?.me?.wallets.list ?? []

        return wallet?.tokenAliases.list ?? []
      }),

  getAssetsListByExchange: (variables: AssetsListByExchangeQueryVariables) =>
    getAPIClient()
      .request<
        AssetsListByExchangeQuery,
        unknown,
        AssetsListByExchangeQueryVariables
      >({
        query: ASSETS_LIST_BY_EXCHANGE.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => {
        const [exchange = undefined] = data?.me?.exchanges.list ?? []

        return exchange?.tokenAliases.list ?? []
      }),

  getAssetsListByProtocol: (variables: AssetListByProtocolQueryVariables) =>
    getAPIClient()
      .request<
        AssetListByProtocolQuery,
        unknown,
        AssetListByProtocolQueryVariables
      >({
        query: ASSETS_LIST_BY_PROTOCOL.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => {
        return data?.me?.tokenAliasesStakedMetrics.list ?? []
      }),

  addWallet: (variables: AddWalletMutationVariables) =>
    getAPIClient()
      .request<AddWalletMutation, unknown, AddWalletMutationVariables>({
        query: ADD_WALLET.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.addWallet),

  getTokenMetric: (variables?: TokenMetricQueryVariables) =>
    getAPIClient()
      .request<TokenMetricQuery, unknown, TokenMetricQueryVariables>({
        query: TOKEN_METRIC.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.me),

  myMetric: (variables?: MyMetricQueryVariables) =>
    getAPIClient()
      .request<MyMetricQuery, unknown, MyMetricQueryVariables>({
        query: MY_METRIC.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.me?.metric),

  isPorfolioCollected: (variables?: IsPorfolioCollectedQueryVariables) =>
    getAPIClient()
      .request<
        IsPorfolioCollectedQuery,
        unknown,
        IsPorfolioCollectedQueryVariables
      >({
        query: IS_PORTFOLIO_COLLECTED.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => Boolean(data?.me?.isPorfolioCollected)),

  getProtocolList: (variables: PortfolioProtocolsQueryVariables) =>
    getAPIClient()
      .request<
        PortfolioProtocolsQuery,
        unknown,
        PortfolioProtocolsQueryVariables
      >({
        query: PORTFOLIO_PROTOCOLS.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => ({
        list: (data?.protocols.list ?? [])
          .filter((v) => v.metric.myStaked !== '0')
          .sort((v) => Number(v.metric.myStaked)),
        count: data?.protocols.pagination.count ?? 0,
      })),
}
