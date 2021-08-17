import { gql } from '@urql/core'

export const GOVERNANCE_RECEIPT = gql`
  query GovernanceReceipt($filter: GovReceiptFilterInputType!) {
    govReceipt(filter: $filter) {
      hasVoted
      support
      votes
      reason
    }
  }
`
