import { gql } from 'urql'

import { PROPOSAL_FRAGMENT } from './proposal.fragment.graphql'

export const PROPOSAL_LIST_BY_STATUS = gql`
  query ProposalsByStatus(
    $sort: [ProposalListSortInputType!]
    $pagination: ProposalListPaginationInputType
  ) {
    open: proposals(
      filter: { status: open }
      sort: $sort
      pagination: $pagination
    ) {
      list {
        ...proposalFragment
      }
      pagination {
        count
      }
    }
    in_process: proposals(
      filter: { status: in_process }
      sort: $sort
      pagination: $pagination
    ) {
      list {
        ...proposalFragment
      }
      pagination {
        count
      }
    }
    executed: proposals(
      filter: { status: executed }
      sort: $sort
      pagination: $pagination
    ) {
      list {
        ...proposalFragment
      }
      pagination {
        count
      }
    }
    defeated: proposals(
      filter: { status: defeated }
      sort: $sort
      pagination: $pagination
    ) {
      list {
        ...proposalFragment
      }
      pagination {
        count
      }
    }
  }
  ${PROPOSAL_FRAGMENT}
`
