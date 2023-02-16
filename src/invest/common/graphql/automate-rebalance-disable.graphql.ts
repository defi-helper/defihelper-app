import { gql } from 'urql'

export const AUTOMATE_REBALANCE_DISABLE = gql`
  mutation AutomateRebalanceDisable(
    $input: AutomateContractRebalanceDisableInputType!
  ) {
    automateContractRebalanceDisable(input: $input)
  }
`
