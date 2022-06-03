import { gql } from 'urql'

export const AUTOSTAKING_BILLING_BALANCE = gql`
  query BillingBalance($blockchain: BlockchainEnum!, $network: String!) {
    billingBalance(blockchain: $blockchain, network: $network) {
      token
      recomendedIncome
      priceUSD
    }
  }
`
