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
} from '~/graphql/_generated-types'
import {
  PROPOSAL_CREATE,
  PROPOSAL_DELETE,
  PROPOSAL_DETAIL,
  PROPOSAL_LIST,
  PROPOSAL_UNVOTE,
  PROPOSAL_UPDATE,
  PROPOSAL_VOTE,
} from './graphql'

export const proposalApi = {
  proposalList: (variables?: ProposalsQueryVariables) =>
    getAPIClient()
      .query<ProposalsQuery, ProposalsQueryVariables>(PROPOSAL_LIST, variables)
      .toPromise()
      .then(({ data }) => ({
        list: data?.proposals.list ?? [],
        pagination: data?.proposals.pagination.count ?? 0,
      })),

  proposalDetail: (variables: ProposalQueryVariables) =>
    getAPIClient()
      .query<ProposalQuery, ProposalQueryVariables>(PROPOSAL_DETAIL, variables)
      .toPromise()
      .then(({ data }) => data?.proposal),

  proposalCreate: (variables: ProposalCreateMutationVariables) =>
    getAPIClient()
      .mutation<ProposalCreateMutation, ProposalCreateMutationVariables>(
        PROPOSAL_CREATE,
        variables
      )
      .toPromise()
      .then(({ data }) => data?.proposalCreate.id),

  proposalUpdate: (variables: ProposalUpdateMutationVariables) =>
    getAPIClient()
      .mutation<ProposalUpdateMutation, ProposalUpdateMutationVariables>(
        PROPOSAL_UPDATE,
        variables
      )
      .toPromise()
      .then(({ data }) => data?.proposalUpdate.id),

  proposalDelete: (proposalId: string) =>
    getAPIClient()
      .mutation<ProposalDeleteMutation, ProposalDeleteMutationVariables>(
        PROPOSAL_DELETE,
        {
          id: proposalId,
        }
      )
      .toPromise()
      .then(({ data }) => data?.proposalDelete),

  proposalVote: (proposalId: string) =>
    getAPIClient()
      .mutation<ProposalVoteMutation, ProposalVoteMutationVariables>(
        PROPOSAL_VOTE,
        { proposal: proposalId }
      )
      .toPromise()
      .then(({ data }) => data?.vote),

  proposalUnvote: (proposalId: string) =>
    getAPIClient()
      .mutation<ProposalUnvoteMutation, ProposalUnvoteMutationVariables>(
        PROPOSAL_UNVOTE,
        { proposal: proposalId }
      )
      .toPromise()
      .then(({ data }) => data?.unvote),
}
