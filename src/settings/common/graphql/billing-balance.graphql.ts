import { gql } from 'urql'

export const BILLING_BALANCE = gql`
  query BillingBalance($blockchain: BlockchainEnum!, $network: String!) {
    billingBalance(blockchain: $blockchain, network: $network) {
      token
      recomendedIncome
      priceUSD
    }
  }
`
