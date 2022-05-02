import { getAPIClient } from '~/api'
import {
  ProposalsQuery,
  ProposalsQueryVariables,
  ProposalCreateMutation,
  ProposalCreateMutationVariables,
  ProposalUpdateMutation,
  ProposalUpdateMutationVariables,
  ProposalDeleteMutation,
  ProposalDeleteMutationVariables,
  ProposalQuery,
  ProposalQueryVariables,
  ProposalVoteMutation,
  ProposalVoteMutationVariables,
  ProposalUnvoteMutation,
  ProposalUnvoteMutationVariables,
  ProposalsByStatusQuery,
  ProposalsByStatusQueryVariables,
  ProposalTagMutationVariables,
  ProposalTagMutation,
  ProposalUntagMutation,
  ProposalUntagMutationVariables,
} from '~/api/_generated-types'
import {
  PROPOSAL_CREATE,
  PROPOSAL_DELETE,
  PROPOSAL_DETAIL,
  PROPOSAL_LIST,
  PROPOSAL_UNVOTE,
  PROPOSAL_UPDATE,
  PROPOSAL_VOTE,
  PROPOSAL_LIST_BY_STATUS,
  PROPOSAL_TAG,
  PROPOSAL_UNTAG,
} from './graphql'

export const roadmapApi = {
  proposalList: (variables?: ProposalsQueryVariables) =>
    getAPIClient()
      .request<ProposalsQuery, unknown, ProposalsQueryVariables>({
        query: PROPOSAL_LIST.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => ({
        list: data?.proposals.list ?? [],
        pagination: data?.proposals.pagination.count ?? 0,
      })),

  proposalListByStatus: (variables?: ProposalsByStatusQueryVariables) =>
    getAPIClient()
      .request<
        ProposalsByStatusQuery,
        unknown,
        ProposalsByStatusQueryVariables
      >({
        query: PROPOSAL_LIST_BY_STATUS.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => ({
        open: data?.open,
        in_process: data?.in_process,
        executed: data?.executed,
        defeated: data?.defeated,
      })),

  proposalDetail: (variables: ProposalQueryVariables) =>
    getAPIClient()
      .request<ProposalQuery, unknown, ProposalQueryVariables>({
        query: PROPOSAL_DETAIL.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.proposal),

  proposalCreate: (variables: ProposalCreateMutationVariables) =>
    getAPIClient()
      .request<
        ProposalCreateMutation,
        unknown,
        ProposalCreateMutationVariables
      >({
        query: PROPOSAL_CREATE.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.proposalCreate),

  proposalTag: (variables: ProposalTagMutationVariables) =>
    getAPIClient()
      .request<ProposalTagMutation, unknown, ProposalTagMutationVariables>({
        query: PROPOSAL_TAG.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.proposalTag),

  proposalUntag: (variables: ProposalUntagMutationVariables) =>
    getAPIClient()
      .request<ProposalUntagMutation, unknown, ProposalUntagMutationVariables>({
        query: PROPOSAL_UNTAG.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.proposalUntag),

  proposalUpdate: (variables: ProposalUpdateMutationVariables) =>
    getAPIClient()
      .request<
        ProposalUpdateMutation,
        unknown,
        ProposalUpdateMutationVariables
      >({
        query: PROPOSAL_UPDATE.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.proposalUpdate),

  proposalDelete: (proposalId: string) =>
    getAPIClient()
      .request<
        ProposalDeleteMutation,
        unknown,
        ProposalDeleteMutationVariables
      >({
        query: PROPOSAL_DELETE.loc?.source.body ?? '',
        variables: {
          id: proposalId,
        },
      })
      .then(({ data }) => data?.proposalDelete),

  vote: (proposalId: string) =>
    getAPIClient()
      .request<ProposalVoteMutation, unknown, ProposalVoteMutationVariables>({
        query: PROPOSAL_VOTE.loc?.source.body ?? '',
        variables: { proposal: proposalId },
      })
      .then(({ data }) => data?.vote),

  proposalUnvote: (proposalId: string) =>
    getAPIClient()
      .request<
        ProposalUnvoteMutation,
        unknown,
        ProposalUnvoteMutationVariables
      >({
        query: PROPOSAL_UNVOTE.loc?.source.body ?? '',
        variables: { proposal: proposalId },
      })
      .then(({ data }) => data?.unvote),
}
