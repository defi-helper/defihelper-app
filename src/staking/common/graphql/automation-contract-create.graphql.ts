import { gql } from 'urql'

import { STAKING_AUTOMATES_CONTRACT_FRAGMENT } from './staking-automates-contract.fragment.graphql'

export const AUTOMATION_CONTRACT_CREATE = gql`
  mutation AutomationContractCreate($input: AutomateContractCreateInputType!) {
    automateContractCreate(input: $input) {
      ...stakingAutomatesContractFragment
    }
  }
  ${STAKING_AUTOMATES_CONTRACT_FRAGMENT}
`
