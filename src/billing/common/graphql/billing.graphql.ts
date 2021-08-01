import { gql } from '@urql/core'

export const BILLING = gql`
  query Billing {
    me {
      billing {
        balance {
          balance
          claim
          netBalance
        }
      }
    }
  }
`
