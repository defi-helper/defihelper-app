import { gql } from '@urql/core'

export const PROPOSAL_UNVOTE = gql`
  mutation ProposalUnvote($proposal: UuidType!) {
    unvote(proposal: $proposal)
  }
`
