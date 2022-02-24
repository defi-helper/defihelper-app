import { gql } from 'urql'

export const PROPOSAL_TAG = gql`
  mutation ProposalTag($proposal: UuidType!, $tag: [ProposalTagEnum!]!) {
    proposalTag(proposal: $proposal, tag: $tag) {
      id
      tag
      createdAt
    }
  }
`
