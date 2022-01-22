import { gql } from 'urql'

import { STAKING_AUTOMATES_CONTRACT_FRAGMENT } from './staking-automates-contract.fragment.graphql'

export const AUTOMATION_CONTRACT_UPDATE = gql`
  mutation AutomationContractUpdate($input: AutomateContractUpdateInputType!) {
    automateContractUpdate(input: $input) {
      ...stakingAutomatesContractFragment
    }
  }
  ${STAKING_AUTOMATES_CONTRACT_FRAGMENT}
`
