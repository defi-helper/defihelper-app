import { gql } from 'urql'

export const BILLING_HISTORY = gql`
  query BillingHistory(
    $filter: UserBillingTransferListFilterInputType
    $sort: [UserBillingTransferListSortInputType!] = [
      { column: createdAt, order: desc }
    ]
    $pagination: UserBillingTransferListPaginationInputType
  ) {
    me {
      billing {
        transfers(filter: $filter, sort: $sort, pagination: $pagination) {
          list {
            id
            blockchain
            network
            account
            amount
            tx
            confirmed
            bill {
              id
              blockchain
              network
              account
              claimant
              claimGasFee
              claimProtocolFee
              gasFee
              protocolFee
              claim
              status
              tx
              createdAt
              updatedAt
            }
            createdAt
          }
          pagination {
            count
          }
        }
      }
    }
  }
`
