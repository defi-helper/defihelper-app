import { gql } from 'urql'

import { PROPOSAL_FRAGMENT } from './proposal.fragment.graphql'

export const PROPOSAL_LIST_BY_STATUS = gql`
  query ProposalsByStatus(
    $tag: [ProposalTagEnum!]
    $sort: [ProposalListSortInputType!]
    $pagination: ProposalListPaginationInputType
  ) {
    open: proposals(
      filter: { status: open, tag: $tag }
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
      filter: { status: in_process, tag: $tag }
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
      filter: { status: executed, tag: $tag }
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
      filter: { status: defeated, tag: $tag }
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
