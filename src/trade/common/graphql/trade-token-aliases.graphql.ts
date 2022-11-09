import { gql } from 'urql'

export const TRADE_TOKEN_ALIASES = gql`
  query TradeTokenAliases(
    $filter: TokenAliasListFilterInputType = {}
    $sort: [TokenAliasListSortInputType!] = [{ column: name, order: asc }]
    $pagination: TokenAliasListPaginationInputType = { limit: 10, offset: 0 }
  ) {
    tokensAlias(filter: $filter, sort: $sort, pagination: $pagination) {
      list {
        id
        symbol
        logoUrl
      }
      pagination {
        count
      }
    }
  }
`
