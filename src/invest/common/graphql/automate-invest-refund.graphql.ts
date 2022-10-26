import { gql } from 'urql'

export const AUTOMATE_INVEST_REFUND = gql`
  mutation AutomateInvestRefund($input: AutomateInvestRefundInputType!) {
    automateInvestRefund(input: $input)
  }
`
