import { gql } from 'urql'

export const PROPOSAL_DELETE = gql`
  mutation ProposalDelete($id: UuidType!) {
    proposalDelete(id: $id)
  }
`
