import { gql } from 'urql'

import { WALLET_FRAGMENT } from './wallet.fragment.graphql'

export const WALLET_LIST = gql`
  query WalletList(
    $sort: [WalletListSortInputType!]
    $pagination: WalletListPaginationInputType
  ) {
    me {
      wallets(
        filter: { type: wallet, deleted: false }
        sort: $sort
        pagination: $pagination
      ) {
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
