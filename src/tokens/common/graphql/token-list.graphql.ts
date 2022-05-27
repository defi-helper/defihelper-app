import { gql } from 'urql'
import { TOKEN_FRAGMENT } from './token.fragment.graphql'

export const TOKENS = gql`
  query Tokens(
    $filter: TokenListQueryFilterInputType
    $sort: [TokenListQuerySortInputType!]
    $pagination: TokenListQueryPaginationInputType
  ) {
    tokens(filter: $filter, sort: $sort, pagination: $pagination) {
      list {
        ...token
      }
      pagination {
        count
      }
    }
  }
  ${TOKEN_FRAGMENT}
`
