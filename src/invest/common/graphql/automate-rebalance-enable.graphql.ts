import { gql } from 'urql'

export const AUTOMATE_REBALANCE_ENABLE = gql`
  mutation AutomateRebalanceEnable(
    $input: AutomateContractRebalanceEnableInputType!
  ) {
    automateContractRebalanceEnable(input: $input)
  }
`
