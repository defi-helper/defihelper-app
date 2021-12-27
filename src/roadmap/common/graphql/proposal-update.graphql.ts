import { gql } from 'urql'

import { PROPOSAL_FRAGMENT } from './proposal.fragment.graphql'

export const PROPOSAL_UPDATE = gql`
  mutation ProposalUpdate($id: UuidType!, $input: ProposalUpdateInputType!) {
    proposalUpdate(id: $id, input: $input) {
      ...proposalFragment
    }
  }
  ${PROPOSAL_FRAGMENT}
`
