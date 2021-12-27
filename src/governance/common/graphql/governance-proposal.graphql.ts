import { gql } from 'urql'

import { GOVERNANCE_PROPOSAL_FRAGMENT } from './governance-proposal.fragment.graphql'

export const GOVERNANCE_PROPOSAL = gql`
  query GovernanceProposal($filter: GovProposalFilterInputType!) {
    govProposal(filter: $filter) {
      ...governanceProposalFragment
    }
  }
  ${GOVERNANCE_PROPOSAL_FRAGMENT}
`
