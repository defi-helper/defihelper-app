import { gql } from '@urql/core'

export const BILLING_HISTORY = gql`
  query BillingHistory(
    $filter: UserBillingTransferListFilterInputType
    $sort: [UserBillingTransferListSortInputType!]
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
