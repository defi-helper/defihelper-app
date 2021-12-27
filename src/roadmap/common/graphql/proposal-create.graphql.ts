import { gql } from 'urql'

import { PROPOSAL_FRAGMENT } from './proposal.fragment.graphql'

export const PROPOSAL_CREATE = gql`
  mutation ProposalCreate($input: ProposalCreateInputType!) {
    proposalCreate(input: $input) {
      ...proposalFragment
    }
  }
  ${PROPOSAL_FRAGMENT}
`
