import { gql } from 'urql'

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
