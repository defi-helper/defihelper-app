import { gql } from '@urql/core'

export const AUTH_ETH = gql`
  mutation AuthEth(
    $input: AuthEthereumInputType!
    $filter: WalletListFilterInputType
    $sort: [WalletListSortInputType!]
    $pagination: WalletListPaginationInputType
  ) {
    authEth(input: $input) {
      user {
        id
        role
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
        createdAt
      }
      sid
    }
  }
`
