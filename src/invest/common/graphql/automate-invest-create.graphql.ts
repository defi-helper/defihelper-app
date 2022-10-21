import { gql } from 'urql'

export const AUTOMATE_INVEST_CREATE = gql`
  mutation AutomateInvestCreate($input: AutomateInvestCreateInputType!) {
    automateInvestCreate(input: $input) {
      id
      amount
      amountUSD
      createdAt
    }
  }
`
