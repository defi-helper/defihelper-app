import { gql } from '@urql/core'

export const BILLING_BILLS = gql`
  query BillingBills(
    $filter: UserBillingBillListFilterInputType
    $sort: [UserBillingBillListSortInputType!]
    $pagination: UserBillingBillListPaginationInputType
  ) {
    me {
      billing {
        bills(filter: $filter, sort: $sort, pagination: $pagination) {
          list {
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
          pagination {
            count
          }
        }
      }
    }
  }
`
