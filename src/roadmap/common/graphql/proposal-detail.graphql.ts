import { gql } from '@urql/core'

import { PROPOSAL_FRAGMENT } from './proposal.fragment.graphql'

export const PROPOSAL_DETAIL = gql`
  query Proposal($filter: ProposalFilterInputType!) {
    proposal(filter: $filter) {
      ...proposalFragment
    }
  }
  ${PROPOSAL_FRAGMENT}
`
