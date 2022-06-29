import { gql } from 'urql'

export const AUTOMATION_PRODUCT_PRICE_FEED = gql`
  query AutomationProductPriceFeed($network: String!, $id: UuidType!) {
    productPriceFeed(network: $network, id: $id) {
      price
    }
  }
`
