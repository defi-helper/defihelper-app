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
} from '~/api/_generated-types'
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

export const protocolsApi = {
  protocolList: (variables: ProtocolsQueryVariables, signal?: AbortSignal) =>
    getAPIClient()
      .request<ProtocolsQuery, unknown, ProtocolsQueryVariables>(
        {
          query: PROTOCOLS.loc?.source.body ?? '',
          variables,
        },
        {
          fetchOptionsOverrides: {
            signal,
          },
        }
      )
      .then(({ data }) => ({
        list: data?.protocols.list ?? [],
        count: data?.protocols.pagination.count ?? 0,
      })),

  dfhProtocolEarningHistory: (
    variables: MonitoringProtocolDfhEarningsHistoryQueryVariables
  ) =>
    getAPIClient()
      .request<
        MonitoringProtocolDfhEarningsHistoryQuery,
        unknown,
        MonitoringProtocolDfhEarningsHistoryQueryVariables
      >({
        query: PROTOCOL_DFH_EARNING_HISTORY.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.monitoringProtocolEarningsHistory),

  protocolListCount: (
    variables: ProtocolsCountQueryVariables,
    signal?: AbortSignal
  ) =>
    getAPIClient()
      .request<ProtocolsCountQuery, unknown, ProtocolsCountQueryVariables>(
        {
          query: PROTOCOL_LIST_COUNT.loc?.source.body ?? '',
          variables,
        },
        {
          fetchOptionsOverrides: {
            signal,
          },
        }
      )
      .then(({ data }) => ({
        favorites: data?.favorites.pagination.count ?? 0,
        all: data?.all.pagination.count ?? 0,
        fullSupport: data?.fullSupport.pagination.count ?? 0,
      })),

  protocolDetail: (variables: ProtocolQueryVariables, signal?: AbortSignal) =>
    getAPIClient()
      .request<ProtocolQuery, unknown, ProtocolQueryVariables>(
        {
          query: PROTOCOL_DETAIL.loc?.source.body ?? '',
          variables,
        },
        {
          fetchOptionsOverrides: {
            signal,
          },
        }
      )
      .then(({ data }) =>
        data?.protocol
          ? {
              ...data.protocol,
              contracts:
                data.protocol.contracts.list?.map(({ id }) => id) ?? [],
              contractsDebank:
                data.protocol.contractsDebank.list?.map(({ id }) => id) ?? [],
            }
          : undefined
      ),

  protocolDetailOverview: (
    variables: ProtocolOverviewQueryVariables,
    signal?: AbortSignal
  ) =>
    getAPIClient()
      .request<ProtocolOverviewQuery, unknown, ProtocolOverviewQueryVariables>(
        {
          query: PROTOCOL_DETAIL_OVERVIEW.loc?.source.body ?? '',
          variables,
        },
        {
          fetchOptionsOverrides: {
            signal,
          },
        }
      )
      .then(({ data }) => data?.protocol),

  protocolDemandMetrics: (
    variables: ProtocolDemandMetricsQueryVariables,
    signal?: AbortSignal
  ) =>
    getAPIClient()
      .request<
        ProtocolDemandMetricsQuery,
        unknown,
        ProtocolDemandMetricsQueryVariables
      >(
        {
          query: PROTOCOL_DEMAND_METRICS.loc?.source.body ?? '',
          variables,
        },
        {
          fetchOptionsOverrides: {
            signal,
          },
        }
      )
      .then(({ data }) => data?.protocol),

  protocolSocialPosts: (
    variables: ProtocolSocialPostsQueryVariables,
    signal?: AbortSignal
  ) =>
    getAPIClient()
      .request<
        ProtocolSocialPostsQuery,
        unknown,
        ProtocolSocialPostsQueryVariables
      >(
        {
          query: PROTOCOL_SOCIAL_POSTS.loc?.source.body ?? '',
          variables,
        },
        {
          fetchOptionsOverrides: {
            signal,
          },
        }
      )
      .then(({ data }) => ({
        list: data?.protocol?.socialPosts.list ?? [],
        count: data?.protocol?.socialPosts.pagination.count ?? 0,
      })),

  protocolDetailMetric: (
    variables: ProtocolMetricQueryVariables,
    signal?: AbortSignal
  ) =>
    getAPIClient()
      .request<ProtocolMetricQuery, unknown, ProtocolMetricQueryVariables>(
        {
          query: PROTOCOL_DETAIL_METRIC.loc?.source.body ?? '',
          variables,
        },
        {
          fetchOptionsOverrides: {
            signal,
          },
        }
      )
      .then(({ data }) => data?.protocol?.metricChartContracts ?? []),

  protocolTvl: (
    variables: ProtocolOverviewMetricQueryVariables,
    signal?: AbortSignal
  ) =>
    getAPIClient()
      .request<
        ProtocolOverviewMetricQuery,
        unknown,
        ProtocolOverviewMetricQueryVariables
      >(
        {
          query: PROTOCOL_OVERVIEW_METRIC.loc?.source.body ?? '',
          variables,
        },
        {
          fetchOptionsOverrides: {
            signal,
          },
        }
      )
      .then(({ data }) => ({
        tvl: data?.protocol?.tvl ?? [],
        debankTvl: data?.protocol?.tvlDebank ?? [],
      })),

  protocolUniqueWallets: (
    variables: ProtocolOverviewMetricQueryVariables,
    signal?: AbortSignal
  ) =>
    getAPIClient()
      .request<
        ProtocolOverviewMetricQuery,
        unknown,
        ProtocolOverviewMetricQueryVariables
      >(
        {
          query: PROTOCOL_OVERVIEW_METRIC.loc?.source.body ?? '',
          variables,
        },
        {
          fetchOptionsOverrides: {
            signal,
          },
        }
      )
      .then(({ data }) => data?.protocol?.uniqueWalletsCount ?? []),

  protocolCreate: (variables: ProtocolCreateMutationVariables) =>
    getAPIClient()
      .request<
        ProtocolCreateMutation,
        unknown,
        ProtocolCreateMutationVariables
      >({
        query: PROTOCOL_CREATE.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.protocolCreate),

  protocolUpdate: (variables: ProtocolUpdateMutationVariables) =>
    getAPIClient()
      .request<
        ProtocolUpdateMutation,
        unknown,
        ProtocolUpdateMutationVariables
      >({
        query: PROTOCOL_UPDATE.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.protocolUpdate),

  protocolResolveContracts: (
    variables: ProtocolResolveContractsMutationVariables,
    signal?: AbortSignal
  ) =>
    getAPIClient()
      .request<
        ProtocolResolveContractsMutation,
        unknown,
        ProtocolResolveContractsMutationVariables
      >(
        {
          query: PROTOCOL_RESOLVE_CONTRACTS.loc?.source.body ?? '',
          variables,
        },
        {
          fetchOptionsOverrides: {
            signal,
          },
        }
      )
      .then(({ data }) => data?.protocolResolveContracts),

  protocolDelete: (id: string) =>
    getAPIClient()
      .request<
        ProtocolDeleteMutation,
        unknown,
        ProtocolDeleteMutationVariables
      >({
        query: PROTOCOL_DELETE.loc?.source.body ?? '',
        variables: { id },
      })
      .then(({ data }) => data?.protocolDelete),

  protocolFavorite: (
    variables: ProtocolFavoriteMutationVariables,
    signal?: AbortSignal
  ) =>
    getAPIClient()
      .request<
        ProtocolFavoriteMutation,
        unknown,
        ProtocolFavoriteMutationVariables
      >(
        {
          query: PROTOCOL_FAVORITE.loc?.source.body ?? '',
          variables,
        },
        {
          fetchOptionsOverrides: {
            signal,
          },
        }
      )
      .then(({ data }) => data?.protocolFavorite),

  earnings: (
    variables: ProtocolEstimatedQueryVariables,
    signal?: AbortSignal
  ) =>
    getAPIClient()
      .request<
        ProtocolEstimatedQuery,
        unknown,
        ProtocolEstimatedQueryVariables
      >(
        {
          query: PROTOCOL_ESTIMATED.loc?.source.body ?? '',
          variables,
        },
        {
          fetchOptionsOverrides: {
            signal,
          },
        }
      )
      .then(({ data }) => data?.restakeStrategy),

  protocolStaked: (
    variables: ProtocolStakedBalanceQueryVariables,
    signal?: AbortSignal
  ) =>
    getAPIClient()
      .request<
        ProtocolStakedBalanceQuery,
        unknown,
        ProtocolStakedBalanceQueryVariables
      >(
        {
          query: PROTOCOL_STAKED_BALANCE.loc?.source.body ?? '',
          variables,
        },
        {
          fetchOptionsOverrides: {
            signal,
          },
        }
      )
      .then(({ data }) => ({
        altCoin: data?.me?.altCoin ?? [],
        stableCoin: data?.me?.stableCoin ?? [],
      })),

  protocolListMetrics: (
    variables: ProtocolListMetricsQueryVariables,
    signal?: AbortSignal
  ) =>
    getAPIClient()
      .request<
        ProtocolListMetricsQuery,
        unknown,
        ProtocolListMetricsQueryVariables
      >(
        {
          query: PROTOCOL_LIST_METRICS.loc?.source.body ?? '',
          variables,
        },
        {
          fetchOptionsOverrides: {
            signal,
          },
        }
      )
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
