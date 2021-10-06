import { gql } from '@urql/core'

import { WALLET_FRAGMENT } from './wallet.fragment.graphql'

export const WALLET_LIST = gql`
  query WalletList(
    $filter: WalletListFilterInputType
    $sort: [WalletListSortInputType!]
    $pagination: WalletListPaginationInputType
  ) {
    me {
      wallets(filter: $filter, sort: $sort, pagination: $pagination) {
        list {
          ...walletFragment
        }
        pagination {
          count
        }
      }
    }
  }
  ${WALLET_FRAGMENT}
`
