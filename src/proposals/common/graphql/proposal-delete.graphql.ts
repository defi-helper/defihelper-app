import { gql } from '@urql/core'

export const PROPOSAL_DELETE = gql`
  mutation ProposalDelete($id: UuidType!) {
    proposalDelete(id: $id)
  }
`
