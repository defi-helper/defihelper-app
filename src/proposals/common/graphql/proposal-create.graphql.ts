import { gql } from '@urql/core'

export const PROPOSAL_CREATE = gql`
  mutation ProposalCreate($input: ProposalCreateInputType!) {
    proposalCreate(input: $input) {
      id
    }
  }
`
