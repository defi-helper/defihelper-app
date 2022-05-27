import { gql } from 'urql'
import { TOKEN_ALIAS_FRAGMENT } from './token-alias.fragment.graphql'

export const TOKENS_ALIAS = gql`
  query TokensAlias(
    $filter: TokenAliasListFilterInputType
    $sort: [TokenAliasListSortInputType!]
    $pagination: TokenAliasListPaginationInputType
  ) {
    tokensAlias(filter: $filter, sort: $sort, pagination: $pagination) {
      list {
        ...tokenAlias
      }
      pagination {
        count
      }
    }
  }
  ${TOKEN_ALIAS_FRAGMENT}
`
