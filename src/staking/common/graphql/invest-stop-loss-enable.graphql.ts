import { gql } from 'urql'

export const INVEST_STOP_LOSS_ENABLE = gql`
  mutation InvestStopLossEnable(
    $input: AutomateContractStopLossEnableInputType!
  ) {
    automateContractStopLossEnable(input: $input)
  }
`
