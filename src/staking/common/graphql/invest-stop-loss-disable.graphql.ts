import { gql } from 'urql'

export const INVEST_STOP_LOSS_DISABLE = gql`
  mutation InvestStopLossDisable(
    $input: AutomateContractStopLossDisableInputType!
  ) {
    automateContractStopLossDisable(input: $input)
  }
`
