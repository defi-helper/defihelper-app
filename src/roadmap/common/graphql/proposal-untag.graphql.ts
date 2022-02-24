import { gql } from 'urql'

export const PROPOSAL_UNTAG = gql`
  mutation ProposalUntag($proposal: UuidType!, $tag: [ProposalTagEnum!]!) {
    proposalUntag(proposal: $proposal, tag: $tag)
  }
`
