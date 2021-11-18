import { gql } from '@urql/core'

export const AUTOMATION_PRODUCTS_BALANCE = gql`
  query AutomationProductsBalance {
    me {
      store {
        balance {
          notifications
        }
      }
    }
  }
`
