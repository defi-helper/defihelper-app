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
    tags
    updatedAt
    createdAt
    votes(pagination: { limit: 1000, offset: 0 }) {
      list {
        ...proposalVoteFragment
      }
    }
  }
  ${PROPOSAL_VOTE_FRAGMENT}
`
