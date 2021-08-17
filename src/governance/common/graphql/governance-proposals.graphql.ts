import { gql } from '@urql/core'

import { GOVERNANCE_PROPOSAL_FRAGMENT } from './governance-proposal.fragment.graphql'

export const GOVERNANCE_PROPOSALS = gql`
  query GovernanceProposals(
    $filter: GovProposalListFilterInputType!
    $sort: [GovProposalListSortInputType!]
    $pagination: GovProposalListPaginationInputType
  ) {
    govProposals(filter: $filter, sort: $sort, pagination: $pagination) {
      list {
        ...governanceProposalFragment
      }
      pagination {
        count
      }
    }
  }
  ${GOVERNANCE_PROPOSAL_FRAGMENT}
`
