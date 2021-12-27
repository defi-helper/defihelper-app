import { gql } from 'urql'

export const PROPOSAL_UNVOTE = gql`
  mutation ProposalUnvote($proposal: UuidType!) {
    unvote(proposal: $proposal)
  }
`
