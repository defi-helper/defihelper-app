import { gql } from 'urql'

export const AUTOMATION_PRODUCTS = gql`
  query AutomationProducts(
    $filter: StoreProductListQueryFilterInputType = {}
    $sort: [StoreProductListQuerySortInputType!] = [
      { column: name, order: asc }
    ]
    $pagination: StoreProductListQueryPaginationInputType = {
      limit: 10
      offset: 0
    }
  ) {
    products(filter: $filter, sort: $sort, pagination: $pagination) {
      list {
        id
        number
        code
        name
        description
        priceUSD
        amount
        updatedAt
        createdAt
      }
    }
  }
`
