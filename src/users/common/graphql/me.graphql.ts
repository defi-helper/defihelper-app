import { gql } from '@urql/core'

export const ME = gql`
  query Me(
    $filter: WalletListFilterInputType
    $sort: [WalletListSortInputType!]
    $pagination: WalletListPaginationInputType
  ) {
    me {
      id
      role
      createdAt
      wallets(filter: $filter, sort: $sort, pagination: $pagination) {
        list {
          id
          blockchain
          network
          address
          publicKey
          createdAt
        }
        pagination {
          count
        }
      }
    }
  }
`
