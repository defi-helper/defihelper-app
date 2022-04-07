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
} from './graphql'
import { PROTOCOL_UPDATE } from './graphql/protocol-update.graphql'
import { PROTOCOL_RESOLVE_CONTRACTS } from '~/protocols/common/graphql/protocol-resolve-contracts.graphql'

export const protocolsApi = {
  protocolList: (variables: ProtocolsQueryVariables) =>
    getAPIClient()
      .query<ProtocolsQuery, ProtocolsQueryVariables>(PROTOCOLS, variables, {
        requestPolicy: 'network-only',
      })
      .toPromise()
      .then(({ data }) => ({
        list: data?.protocols.list ?? [],
        count: data?.protocols.pagination.count ?? 0,
      })),

  protocolListCount: (variables: ProtocolsCountQueryVariables) =>
    getAPIClient()
      .query<ProtocolsCountQuery, ProtocolsCountQueryVariables>(
        PROTOCOL_LIST_COUNT,
        variables
      )
      .toPromise()
      .then(({ data }) => ({
        favorites: data?.favorites.pagination.count ?? 0,
        all: data?.all.pagination.count ?? 0,
      })),

  protocolDetail: (variables: ProtocolQueryVariables) =>
    getAPIClient()
      .query<ProtocolQuery, ProtocolQueryVariables>(PROTOCOL_DETAIL, variables)
      .toPromise()
      .then(({ data }) => data?.protocol),

  protocolDetailOverview: (variables: ProtocolOverviewQueryVariables) =>
    getAPIClient()
      .query<ProtocolOverviewQuery, ProtocolOverviewQueryVariables>(
        PROTOCOL_DETAIL_OVERVIEW,
        variables
      )
      .toPromise()
      .then(({ data }) => data?.protocol),

  protocolSocialPosts: (variables: ProtocolSocialPostsQueryVariables) =>
    getAPIClient()
      .query<ProtocolSocialPostsQuery, ProtocolSocialPostsQueryVariables>(
        PROTOCOL_SOCIAL_POSTS,
        variables
      )
      .toPromise()
      .then(({ data }) => ({
        list: data?.protocol?.socialPosts.list ?? [],
        count: data?.protocol?.socialPosts.pagination.count ?? 0,
      })),

  protocolDetailMetric: (variables: ProtocolMetricQueryVariables) =>
    getAPIClient()
      .query<ProtocolMetricQuery, ProtocolMetricQueryVariables>(
        PROTOCOL_DETAIL_METRIC,
        variables
      )
      .toPromise()
      .then(({ data }) => data?.protocol?.metricChartContracts ?? []),

  protocolTvl: (variables: ProtocolOverviewMetricQueryVariables) =>
    getAPIClient()
      .query<ProtocolOverviewMetricQuery, ProtocolOverviewMetricQueryVariables>(
        PROTOCOL_OVERVIEW_METRIC,
        variables
      )
      .toPromise()
      .then(({ data }) => ({
        tvl: data?.protocol?.tvl ?? [],
        debankTvl: data?.protocol?.tvlDebank ?? [],
      })),

  protocolUniqueWallets: (variables: ProtocolOverviewMetricQueryVariables) =>
    getAPIClient()
      .query<ProtocolOverviewMetricQuery, ProtocolOverviewMetricQueryVariables>(
        PROTOCOL_OVERVIEW_METRIC,
        variables
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
    variables: ProtocolResolveContractsMutationVariables
  ) =>
    getAPIClient()
      .mutation<
        ProtocolResolveContractsMutation,
        ProtocolResolveContractsMutationVariables
      >(PROTOCOL_RESOLVE_CONTRACTS, variables)
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

  protocolFavorite: (variables: ProtocolFavoriteMutationVariables) =>
    getAPIClient()
      .mutation<ProtocolFavoriteMutation, ProtocolFavoriteMutationVariables>(
        PROTOCOL_FAVORITE,
        variables
      )
      .toPromise()
      .then(({ data }) => data?.protocolFavorite),

  earnings: (variables: ProtocolEstimatedQueryVariables) =>
    getAPIClient()
      .query<ProtocolEstimatedQuery, ProtocolEstimatedQueryVariables>(
        PROTOCOL_ESTIMATED,
        variables
      )
      .toPromise()
      .then(({ data }) => data?.restakeStrategy),

  protocolStaked: (variables: ProtocolStakedBalanceQueryVariables) =>
    getAPIClient()
      .query<ProtocolStakedBalanceQuery, ProtocolStakedBalanceQueryVariables>(
        PROTOCOL_STAKED_BALANCE,
        variables
      )
      .toPromise()
      .then(({ data }) => ({
        altCoin: data?.me?.altCoin ?? [],
        stableCoin: data?.me?.stableCoin ?? [],
      })),
}
