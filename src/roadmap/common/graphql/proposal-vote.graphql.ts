import { gql } from 'urql'

import { PROPOSAL_VOTE_FRAGMENT } from './proposal-vote.fragment.graphql'

export const PROPOSAL_VOTE = gql`
  mutation ProposalVote($proposal: UuidType!) {
    vote(proposal: $proposal) {
      ...proposalVoteFragment
    }
  }
  ${PROPOSAL_VOTE_FRAGMENT}
`
