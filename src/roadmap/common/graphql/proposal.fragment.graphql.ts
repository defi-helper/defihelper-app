import { gql } from 'urql'

import { PROPOSAL_VOTE_FRAGMENT } from './proposal-vote.fragment.graphql'

export const PROPOSAL_FRAGMENT = gql`
  fragment proposalFragment on ProposalType {
    id
    title
    description
    status
    releasedAt
    plannedAt
    author {
      id
      createdAt
    }
    updatedAt
    createdAt
    votes {
      list {
        ...proposalVoteFragment
      }
    }
  }
  ${PROPOSAL_VOTE_FRAGMENT}
`
