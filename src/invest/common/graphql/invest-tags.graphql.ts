import { gql } from 'urql'

export const INVEST_TAGS = gql`
  query InvestTags(
    $sort: [TagsListSortInputType!] = [{ column: position, order: asc }]
    $pagination: TagsListPaginationInputType = { limit: 10, offset: 0 }
  ) {
    tags(sort: $sort, pagination: $pagination) {
      list {
        name
        type
        id
      }
      pagination {
        count
      }
    }
  }
`
