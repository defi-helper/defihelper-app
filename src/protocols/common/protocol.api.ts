import { getAPIClient } from '~/api'
import {
  ProtocolCreateMutation,
  ProtocolCreateMutationVariables,
  ProtocolDeleteMutation,
  ProtocolDeleteMutationVariables,
  ProtocolQuery,
  ProtocolQueryVariables,
  ProtocolsQuery,
  ProtocolsQueryVariables,
  ProtocolUpdateMutation,
  ProtocolUpdateMutationVariables,
  ProtocolMetricQuery,
  ProtocolMetricQueryVariables,
  ProtocolFavoriteMutation,
  ProtocolFavoriteMutationVariables,
  ProtocolOverviewMetricQuery,
  ProtocolOverviewMetricQueryVariables,
  ProtocolEstimatedQuery,
  ProtocolEstimatedQueryVariables,
  ProtocolStakedBalanceQuery,
  ProtocolStakedBalanceQueryVariables,
  ProtocolResolveContractsMutationVariables,
  ProtocolResolveContractsMutation,
  ProtocolSocialPostsQueryVariables,
  ProtocolSocialPostsQuery,
  ProtocolsCountQueryVariables,
  ProtocolsCountQuery,
  ProtocolOverviewQuery,
  ProtocolOverviewQueryVariables,
  ProtocolDemandMetricsQuery,
  ProtocolDemandMetricsQueryVariables,
  ProtocolListMetricsQuery,
  ProtocolListMetricsQueryVariables,
  MonitoringProtocolDfhEarningsHistoryQueryVariables,
  MonitoringProtocolDfhEarningsHistoryQuery,
} from '~/graphql/_generated-types'
import {
  PROTOCOLS,
  PROTOCOL_CREATE,
  PROTOCOL_DELETE,
  PROTOCOL_DETAIL,
  PROTOCOL_DETAIL_METRIC,
  PROTOCOL_ESTIMATED,
  PROTOCOL_FAVORITE,
  PROTOCOL_OVERVIEW_METRIC,
  PROTOCOL_STAKED_BALANCE,
  PROTOCOL_SOCIAL_POSTS,
  PROTOCOL_LIST_COUNT,
  PROTOCOL_DETAIL_OVERVIEW,
  PROTOCOL_DEMAND_METRICS,
  PROTOCOL_LIST_METRICS,
  PROTOCOL_DFH_EARNING_HISTORY,
} from './graphql'
import { PROTOCOL_UPDATE } from './graphql/protocol-update.graphql'
import { PROTOCOL_RESOLVE_CONTRACTS } from '~/protocols/common/graphql/protocol-resolve-contracts.graphql'
import { config } from '~/config'

const client = getAPIClient()

const fetchOptions =
  typeof client.fetchOptions === 'function'
    ? client.fetchOptions?.()
    : client.fetchOptions

export const protocolsApi = {
  protocolList: (variables: ProtocolsQueryVariables, signal?: AbortSignal) =>
    getAPIClient()
      .query<ProtocolsQuery, ProtocolsQueryVariables>(PROTOCOLS, variables, {
        requestPolicy: 'network-only',
        fetchOptions: {
          signal,
          ...fetchOptions,
        },
      })
      .toPromise()
      .then(({ data }) => ({
        list: data?.protocols.list ?? [],
        count: data?.protocols.pagination.count ?? 0,
      })),

  dfhProtocolEarningHistory: (
    variables: MonitoringProtocolDfhEarningsHistoryQueryVariables
  ) =>
    getAPIClient()
      .query<
        MonitoringProtocolDfhEarningsHistoryQuery,
        MonitoringProtocolDfhEarningsHistoryQueryVariables
      >(PROTOCOL_DFH_EARNING_HISTORY, variables)
      .toPromise()
      .then(({ data }) => data?.monitoringProtocolEarningsHistory),

  protocolListCount: (
    variables: ProtocolsCountQueryVariables,
    signal?: AbortSignal
  ) =>
    getAPIClient()
      .query<ProtocolsCountQuery, ProtocolsCountQueryVariables>(
        PROTOCOL_LIST_COUNT,
        variables,
        {
          fetchOptions: {
            signal,
            ...fetchOptions,
          },
        }
      )
      .toPromise()
      .then(({ data }) => ({
        favorites: data?.favorites.pagination.count ?? 0,
        all: data?.all.pagination.count ?? 0,
      })),

  protocolDetail: (variables: ProtocolQueryVariables, signal?: AbortSignal) =>
    getAPIClient()
      .query<ProtocolQuery, ProtocolQueryVariables>(
        PROTOCOL_DETAIL,
        variables,
        {
          fetchOptions: {
            signal,
            ...fetchOptions,
          },
        }
      )
      .toPromise()
      .then(({ data }) =>
        data?.protocol
          ? {
              ...data.protocol,
              contracts:
                data.protocol.contracts.list?.map(({ id }) => id) ?? [],
            }
          : undefined
      ),

  protocolDetailOverview: (
    variables: ProtocolOverviewQueryVariables,
    signal?: AbortSignal
  ) =>
    getAPIClient()
      .query<ProtocolOverviewQuery, ProtocolOverviewQueryVariables>(
        PROTOCOL_DETAIL_OVERVIEW,
        variables,
        {
          fetchOptions: {
            signal,
            ...fetchOptions,
          },
        }
      )
      .toPromise()
      .then(({ data }) => data?.protocol),

  protocolDemandMetrics: (
    variables: ProtocolDemandMetricsQueryVariables,
    signal?: AbortSignal
  ) =>
    getAPIClient()
      .query<ProtocolDemandMetricsQuery, ProtocolDemandMetricsQueryVariables>(
        PROTOCOL_DEMAND_METRICS,
        variables,
        {
          fetchOptions: {
            signal,
            ...fetchOptions,
          },
        }
      )
      .toPromise()
      .then(({ data }) => data?.protocol),

  protocolSocialPosts: (
    variables: ProtocolSocialPostsQueryVariables,
    signal?: AbortSignal
  ) =>
    getAPIClient()
      .query<ProtocolSocialPostsQuery, ProtocolSocialPostsQueryVariables>(
        PROTOCOL_SOCIAL_POSTS,
        variables,
        {
          fetchOptions: {
            signal,
          },
        }
      )
      .toPromise()
      .then(({ data }) => ({
        list: data?.protocol?.socialPosts.list ?? [],
        count: data?.protocol?.socialPosts.pagination.count ?? 0,
      })),

  protocolDetailMetric: (
    variables: ProtocolMetricQueryVariables,
    signal?: AbortSignal
  ) =>
    getAPIClient()
      .query<ProtocolMetricQuery, ProtocolMetricQueryVariables>(
        PROTOCOL_DETAIL_METRIC,
        variables,
        {
          fetchOptions: {
            signal,
            ...fetchOptions,
          },
        }
      )
      .toPromise()
      .then(({ data }) => data?.protocol?.metricChartContracts ?? []),

  protocolTvl: (
    variables: ProtocolOverviewMetricQueryVariables,
    signal?: AbortSignal
  ) =>
    getAPIClient()
      .query<ProtocolOverviewMetricQuery, ProtocolOverviewMetricQueryVariables>(
        PROTOCOL_OVERVIEW_METRIC,
        variables,
        {
          fetchOptions: {
            signal,
            ...fetchOptions,
          },
        }
      )
      .toPromise()
      .then(({ data }) => ({
        tvl: data?.protocol?.tvl ?? [],
        debankTvl: data?.protocol?.tvlDebank ?? [],
      })),

  protocolUniqueWallets: (
    variables: ProtocolOverviewMetricQueryVariables,
    signal?: AbortSignal
  ) =>
    getAPIClient()
      .query<ProtocolOverviewMetricQuery, ProtocolOverviewMetricQueryVariables>(
        PROTOCOL_OVERVIEW_METRIC,
        variables,
        {
          fetchOptions: {
            signal,
            ...fetchOptions,
          },
        }
      )
      .toPromise()
      .then(({ data }) => data?.protocol?.uniqueWalletsCount ?? []),

  protocolCreate: (variables: ProtocolCreateMutationVariables) =>
    getAPIClient()
      .mutation<ProtocolCreateMutation, ProtocolCreateMutationVariables>(
        PROTOCOL_CREATE,
        variables
      )
      .toPromise()
      .then(({ data }) => data?.protocolCreate),

  protocolUpdate: (variables: ProtocolUpdateMutationVariables) =>
    getAPIClient()
      .mutation<ProtocolUpdateMutation, ProtocolUpdateMutationVariables>(
        PROTOCOL_UPDATE,
        variables
      )
      .toPromise()
      .then(({ data }) => data?.protocolUpdate),

  protocolResolveContracts: (
    variables: ProtocolResolveContractsMutationVariables,
    signal?: AbortSignal
  ) =>
    getAPIClient()
      .mutation<
        ProtocolResolveContractsMutation,
        ProtocolResolveContractsMutationVariables
      >(PROTOCOL_RESOLVE_CONTRACTS, variables, {
        fetchOptions: {
          signal,
          ...fetchOptions,
        },
      })
      .toPromise()
      .then(({ data }) => data?.protocolResolveContracts),

  protocolDelete: (id: string) =>
    getAPIClient()
      .mutation<ProtocolDeleteMutation, ProtocolDeleteMutationVariables>(
        PROTOCOL_DELETE,
        { id }
      )
      .toPromise()
      .then(({ data }) => data?.protocolDelete),

  protocolFavorite: (
    variables: ProtocolFavoriteMutationVariables,
    signal?: AbortSignal
  ) =>
    getAPIClient()
      .mutation<ProtocolFavoriteMutation, ProtocolFavoriteMutationVariables>(
        PROTOCOL_FAVORITE,
        variables,
        {
          fetchOptions: {
            signal,
            ...fetchOptions,
          },
        }
      )
      .toPromise()
      .then(({ data }) => data?.protocolFavorite),

  earnings: (
    variables: ProtocolEstimatedQueryVariables,
    signal?: AbortSignal
  ) =>
    getAPIClient()
      .query<ProtocolEstimatedQuery, ProtocolEstimatedQueryVariables>(
        PROTOCOL_ESTIMATED,
        variables,
        {
          fetchOptions: {
            signal,
            ...fetchOptions,
          },
        }
      )
      .toPromise()
      .then(({ data }) => data?.restakeStrategy),

  protocolStaked: (
    variables: ProtocolStakedBalanceQueryVariables,
    signal?: AbortSignal
  ) =>
    getAPIClient()
      .query<ProtocolStakedBalanceQuery, ProtocolStakedBalanceQueryVariables>(
        PROTOCOL_STAKED_BALANCE,
        variables,
        {
          fetchOptions: {
            signal,
            ...fetchOptions,
          },
        }
      )
      .toPromise()
      .then(({ data }) => ({
        altCoin: data?.me?.altCoin ?? [],
        stableCoin: data?.me?.stableCoin ?? [],
      })),

  protocolListMetrics: (
    variables: ProtocolListMetricsQueryVariables,
    signal?: AbortSignal
  ) =>
    getAPIClient()
      .query<ProtocolListMetricsQuery, ProtocolListMetricsQueryVariables>(
        PROTOCOL_LIST_METRICS,
        variables,
        {
          requestPolicy: 'cache-and-network',
          fetchOptions: {
            signal,
            ...fetchOptions,
          },
        }
      )
      .toPromise()
      .then(({ data }) =>
        (data?.protocols.list ?? []).reduce<
          Record<
            string,
            Exclude<
              ProtocolListMetricsQuery['protocols']['list'],
              null | undefined
            >[number]['metric']
          >
        >((acc, protocol) => {
          acc[protocol.id] = protocol.metric

          return acc
        }, {})
      ),

  protocolAdapters: () =>
    fetch(config.ADAPTERS_HOST).then((res) => res.json()) as Promise<string[]>,
}
